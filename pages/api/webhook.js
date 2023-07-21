import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = "whsec_a5ef1bb4e884cef3c20c970ca1f6e9bec4049510e3b6ceda3c38a9af7efdd238";

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_SK;
  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, secret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log(`Received event: ${event.type}`);
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      console.log(`Received payment for order ${orderId}: ${paid}`);
        if (orderId && paid) {
          try {
            const result = await Order.findByIdAndUpdate(orderId, {
              paid: true
            });
            console.log(`Updated order ${orderId}: ${result}`);
          } catch (err) {
            console.error(`Error updating order ${orderId}: ${err.message}`);
          }
        }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

res.status(200).send('Success'); 
}

export const config = {
  api: {bodyParser: false,} 
                  
}