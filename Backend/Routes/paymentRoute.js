const express = require("express");
const {
  processPayment,
  sendStripeApiKey} = require("../Controllers/paymentController");

const router = express.Router();

const { isAuthenticatedUser } = require("../Middleware/auth");

router.route("/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;