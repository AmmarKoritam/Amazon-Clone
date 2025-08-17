/* eslint-disable no-undef */

require("dotenv").config();

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// App config
const app = express();
// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  // ok - createda
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// example endpoint
// http://127.0.0.1:5001/clone-a04b0/us-central1/api

// listen command

exports.api = functions.https.onRequest(app);
