# E-commerce front
**Note:** This project is currently a work in progress and not yet completed. However, it provides an overview of its functionalities.

## Description
The E-commerce Frontend project is being developed using cutting-edge technologies, including Next.js for a seamless user experience, Styled Components for modular and maintainable styling, MongoDB as the database for efficient data management, and Vercel for reliable and scalable deployment.

## Features

**User-Friendly Shopping:** Our platform offers a user-friendly interface, allowing customers to easily browse and purchase products online through a secure payment system powered by Stripe.

**Responsive Cart Management:** Customers can effortlessly add or remove products from their cart, making the shopping experience more convenient and enjoyable.

**Integration with Admin Panel:** This frontend seamlessly communicates with the admin panel, streamlining the order management process. Each purchase made by users will be reflected in the admin panel's orders section.

**Stripe Webhook:** The application utilizes a Stripe webhook to receive real-time updates about user payments. When a user completes a purchase, Stripe sends a webhook event to our backend server, bringing essential information about the payment, such as its status and details. This allows us to update the admin panel with the appropriate payment status, ensuring that all orders are accurately tracked and managed.

## Instructions for Testing
To simulate a purchase and test the payment functionality, you can use the following test card details:

**Card Number:** 4242 4242 4242 4242

**Expiration Date (MM/YY):** Use any future date

**CVC:** Use any 3-digit number of your choice

Please note that this is a test environment, and no real transactions will occur. Stripe's test card information allows you to safely experience the payment process without using actual payment credentials.

**Caution:** Do not use real payment information while testing. Use only the provided test card details to ensure a secure testing experience.
