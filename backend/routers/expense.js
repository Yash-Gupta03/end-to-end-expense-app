const express = require("express");
const expenseController = require("../controllers/expenses");
const authController = require("../middlewares/authentic");

const router = express.Router();

router.use(
  "/add-expense",
  authController.authenticate,
  expenseController.addExpense
);

router.use(
  "/get-expense",
  authController.authenticate,
  expenseController.getExpense
);

router.use(
  "/delete-expense/:id",
  authController.authenticate,
  expenseController.deleteExpense
);

router.get('/download', authController.authenticate, expenseController.downloadExpenses)


module.exports = router;
