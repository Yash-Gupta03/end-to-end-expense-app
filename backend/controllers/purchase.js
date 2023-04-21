const Razorpay = require("razorpay");
const Order = require("../models/order");

exports.purchasePremium = async (req, res, next) => {
  try {
    let rzp = new Razorpay({
      key_id: "rzp_test_bqd1EbJpaDEnCE",
      key_secret: "NziTWQ300XCTrigeePWKyWc2",
    });
    const amount = 1000;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        console.log(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          console.log("backend to frontend -- passing orderId and key");
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => console.log(err));
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } })
      const promise1 = order.update({ paymentid: payment_id, status: "SUCCESSFULL" })
      const promise2 = req.user.update({ ispremiumuser: true })
      promise1.all([promise1, promise2]).then(()=>{
        return res.status(202).json({ success: true, message: "transaction successful" });
      }).catch((err)=>{
        console.log(err);
      })
  } catch (err) {
    console.log(err);
  }
};
