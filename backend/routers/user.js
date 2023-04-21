const express = require("express");

const userController = require("../controllers/users");
const expenseController = require("../controllers/expenses");
const authController = require("../middlewares/authentic");
const purchaseController = require("../controllers/purchase");

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

router.use(
  "/purchase/premiummembership",
  authController.authenticate,
  purchaseController.purchasePremium
);

router.use(
  "/purchase/updatetransactionstatus",
  authController.authenticate,
  purchaseController.updateTransaction
);

module.exports = router;
