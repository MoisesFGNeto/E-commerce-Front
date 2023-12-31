import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
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