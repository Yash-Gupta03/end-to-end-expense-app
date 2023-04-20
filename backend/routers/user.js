const express = require("express");

const userController = require("../controllers/users");

const expenseController = require("../controllers/expenses");

const router = express.Router();

router.use("/user/sign-up", userController.signUp);

router.use("/user/login", userController.login);

router.use("/expense/add-expense", expenseController.addExpense);

router.use("/expense/get-expense", expenseController.getExpense);

router.use("/expense/delete-expense/:id", expenseController.deleteExpense);

module.exports = router;
