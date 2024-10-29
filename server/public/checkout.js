// This is your test secret API key.
const stripe = Stripe("pk_test_51PzNMZJuhgKcHeSBQsFZ0xyefw3pwW6zOK6p5ZBdKcgCl8B3Y0ygxXw5NmrCzEewve1wiVxXOmonp9qe9RekLSVO009lpXCRcK");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}