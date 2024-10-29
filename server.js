// This is your test secret API key.
const stripe = require('stripe')('sk_test_51PzNMZJuhgKcHeSBjQDA341v595VslSvDsi0EAQQOLf0icKHaV3uh6msY1lXqvPdtKNXnyGWmgmSxC6u3ozdSpQ600W9H5ajw9');
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
app.use(express.static('public'));
app.use(cors)
app.use(bodyParser.json())
const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(4242, () => console.log('Running on port 4242'));