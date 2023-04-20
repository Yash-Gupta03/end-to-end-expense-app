const Expense = require("../models/expense");

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.addExpense = async (req, res, next) => {
  const { price, description, category } = req.body;
  if (
    isStringInvalid(price) ||
    isStringInvalid(description) ||
    isStringInvalid(category)
  ) {
    res.status(400).json({ message: "bad parameters" });
  }
  const data = await Expense.create({
    price: price,
    description: description,
    category: category,
    userId: req.user.id,
  });
  res.json({ newExpenseDetail: data });
};

exports.getExpense = async (req, res, next) => {
  const data = await Expense.findAll({ where: { userId: req.user.id } });
  res.json({ allExpenseDetails: data });
};

exports.deleteExpense = async (req, res, next) => {
  const data = await Expense.destroy({
    where: { id: req.params.id, userId: req.user.id },
  });
  res.status(200).json({ data: data });
};
