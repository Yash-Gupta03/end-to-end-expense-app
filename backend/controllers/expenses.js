const Expense = require("../models/expense");
const User = require('../models/user');
const sequelize = require("../utils/database");

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.addExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  const { price, description, category } = req.body;
  if (
    isStringInvalid(price) ||
    isStringInvalid(description) ||
    isStringInvalid(category)
  ) {
    res.status(400).json({ message: "bad parameters" });
  }
  try{
  const total = Number(req.user.totalExpense) + Number(price);
  const userupdate = await User.update({totalExpense:total}, {where:{id:req.user.id}}, {transaction:t});
  const data = await Expense.create({
    price: price,
    description: description,
    category: category,
    userId: req.user.id,
  }, {transaction:t});
  await t.commit();
  res.json({ newExpenseDetail: data });
}catch(err){
  await t.rollback();
  console.log(err);
}};

exports.getExpense = async (req, res, next) => {
  const data = await Expense.findAll({ where: { userId: req.user.id } });
  res.json({ allExpenseDetails: data });
};

exports.deleteExpense = async (req, res, next) => {
  
    const t = await sequelize.transaction();
    try{
    const price = await Expense.findAll({where:{id:req.params.id}, attributes:['price']},{transaction:t});
    console.log(`price = `, price);
    const total = Number(req.user.totalExpense) - Number(price[0].price);
    const userupdate = await User.update({totalExpense:total}, {where:{id:req.user.id}}, {transaction:t});
    const data = await Expense.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    await t.commit();
    res.status(200).json({ data: data });
  }catch(error){
    await t.rollback();
  }
}
