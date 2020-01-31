const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_wBbuwMhaBm8gYn6vFZZNvMSq");
const uuid = require("uuid/v4");

// @route POST api/payment
// @Desc Paymant with Stripe
// @access Private
router.post("/", async (req, res) => {
  let error;
  let status;

  try {
    const { profile, token } = req.body;

    const amount = profile.subscription_plan === "30" ? 90 : 240;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotencyKey = uuid();

    await stripe.charges.create(
      {
        amount: amount * 100,
        currency: "chf",
        customer: customer.id,
        receipt_email: token.email,
        description: `${req.body.token.card.name} pay for ${profile.subscription_plan} days`
      },
      { idempotencyKey }
    );

    status = "success";
  } catch (error) {
    console.log("ERROR", error);
    status = "Failure";
  }

  // res.render(`/postanadform`);
  res.json({ error, status });
});

module.exports = router;
