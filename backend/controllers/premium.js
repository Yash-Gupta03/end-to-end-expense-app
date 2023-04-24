const Expense = require("../models/expense");


exports.getAllExpenses = async (req, res, next) => {
    const data = await Expense.findAll({order:[['price','DESC']], attributes:['id', 'price', 'description', 'category']});
    res.status(202).json({ expenseLeaderboard: data });
  };