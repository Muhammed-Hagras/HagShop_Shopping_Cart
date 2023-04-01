const express = require("express");
const Stripe = require("stripe");
const router = require("./register");
const { Order } = require("../models/orders");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  //Including the customer

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "Egp",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: { allowed_countries: ["US", "CA", "EG"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "Egp" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 1500, currency: "Egp" },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 1 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    customer: customer.id, // customer included when checking
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});


//Create Order

const createOrder = async (customer, data) => {
    const Items = JSON.parse(customer.metadata.cart);
    // Items.map(item => {
    //     return {
            
    //     }
    //   })

    const newOrder = new Order({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntetId: data.paymentIntetId,
      products: Items,
      subtotal: data.amount_subtotal,
      tax: data.amount_tax,
      shipping: data.customer_details,
      payment_status: data.payment_status,
      total: data.amount_total,
    });

    try {
        const savedOrder = await newOrder.save();
        console.log("Hagras Order:  " + savedOrder)
    } catch (error) {
        console.log(error);
    }
  };


//Webbhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.WEBHOOK_SECRET
  

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  (req, res) => {
    // في مشكلة هنا انه لازم ياخد ال body buffer or string
    // ولكن الي رايح pasred js object
    //     webhook Error: Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead.
    // Signature verification is impossible without access to the original signed material.
    // Learn more about webhook signing and explore webhook integration examples for various frameworks at https://github.com/stripe/stripe-node#webhook-signing
    //   const sig = req.headers['stripe-signature'];

    //   let data;
    //   let event;

    //   try {
    //     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    //     console.log("Webhook verfiied");
    //   } catch (err) {
    //     // console.log(`webhook Error: ${err.message}`)
    //     res.status(400).send(`Webhook Error: ${err.message}`);
    //     return;
    //   }

    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
    let data;
    let eventType;
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        endpointSecret
      );
    //   console.log(`Hagras Webhook Verified: `, event);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
        stripe.customers
          .retrieve(data.customer)
          .then(async (customer) => {
            try {
              // CREATE ORDER
              createOrder(customer, data);
            } catch (err) {
              console.log(typeof createOrder);
              console.log(err);
            }
          
    // console.log({customer});
    console.log({data})
    })
          .catch((err) => console.log(err.message));
      }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
