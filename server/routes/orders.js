const { Order } = require("../models/orders");
const { isAdmin } = require("../middleware/auth");
const moment = require("moment");

const router = require("express").Router();

//GET ORDERS

router.get("/", isAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const order = query
      ? await Order.find().sort({ _id: -1 }).limit(4)
      : await Order.find().sort({ _id: -1 });
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get one orders
router.get("/find/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//UPdate ORDER

router.put("/:id", isAdmin, async (req, res) => {

  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
      {
        $set: req.body,
      },
      { new: true },
      );
      // console.log(updatedOrder)
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


// GET ORDERS STATS

//Getting Last Previous month stats
router.get("/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1) // Setting from day one --you can change
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const orders = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }

  // res.send(previousMonth);
});

// GET ORDERS INCOME STATS

//Getting Last Previous month stats
router.get("/income/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1) // Setting from day one --you can change
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }

  // res.send(previousMonth);
});

// GET 1 WEEK SALES

//Getting Last Previous month stats
router.get("/week-sales", isAdmin, async (req, res) => {
  const last7Days = moment()
    .day(moment().day() - 7)
    // Setting from day - 7 => one week --you can change
    .format("YYYY-MM-DD HH:mm:ss");
  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(last7Days) } },
      },
      {
        $project: {
          day: { $dayOfWeek: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$day",
          total: { $sum: "$sales" },
        },
      },
    ]);
    // console.log(income)
    res.status(200).send(income);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }

  // res.send(previousMonth);
});

module.exports = router;
