const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const { Order } = require("./models/order.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

const razor = new Razorpay({
  key_id: "rzp_test_tCH1bRNZUYBZLy",
  key_secret: "QpEpEPm3A23FfL9UBYKTL3nw",
});

app.post("/payment/checkout", async (req, res) => {
  const { name, amount } = req.body;

  const options = {
    amount: Number(amount) * 100,
    currency: "INR",
  };

  const order_billed = await razor.orders.create(options);
  console.log(order_billed);
  await Order.create({
    order_id: order_billed.id,
    name: name,
    amount: amount,
  });

  return res.json(order_billed);
});

app.post("/payment/verification", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body_data = razorpay_order_id + "|" + razorpay_payment_id;

  const expect = crypto
    .createHmac("sha256", "QpEpEPm3A23FfL9UBYKTL3nw")
    .update(body_data)
    .digest("hex");
  const isValid = expect === razorpay_signature;
  if (isValid) {
    await Order.findOneAndUpdate(
      { order_id: razorpay_order_id },
      {
        $set: {
          razorpay_payment_id,
          razorpay_signature,
          razorpay_order_id,
        },
      }
    );
    return res.redirect(
      `http://localhost:3000/success?payment_id=${razorpay_payment_id}`
    );
  } else {
    return res.redirect("http://localhost:3000/failed");
  }
});

mongoose
  .connect(
    "mongodb+srv://givan:givan@nodejs-auth.9cm86qm.mongodb.net/razorpay?retryWrites=true&w=majority"
  )
  .then((res) => {
    app.listen(5000, () => {
      console.log(`Live at http://localhost:${5000}`);
    });
    console.log("DB Connected!!");
  })
  .catch((err) => {
    console.log("DB Error", err);
  });
