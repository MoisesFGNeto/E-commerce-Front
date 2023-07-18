import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = "whsec_a5ef1bb4e884cef3c20c970ca1f6e9bec4049510e3b6ceda3c38a9af7efdd238";

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

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
        if (orderId && paid) {
          await Order.findByIdAndUpdate(orderId, {
            paid:true
          })
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


//account id: acct_1NUgIaHRZ5z5PDO9
//signing secret the same as endpointSecret: whsec_a5ef1bb4e884cef3c20c970ca1f6e9bec4049510e3b6ceda3c38a9af7efdd238