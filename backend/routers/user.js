const express = require("express");

const userController = require("../controllers/users");
const expenseController = require("../controllers/expenses");
const authController = require("../middlewares/authentic");

const router = express.Router();

router.use("/user/sign-up", userController.signUp);

router.use("/user/login", userController.login);

router.use(
  "/expense/add-expense",
  authController.authenticate,
  expenseController.addExpense
);

router.use(
  "/expense/get-expense",
  authController.authenticate,
  expenseController.getExpense
);

router.use(
  "/expense/delete-expense/:id",
  authController.authenticate,
  expenseController.deleteExpense
);

module.exports = router;
