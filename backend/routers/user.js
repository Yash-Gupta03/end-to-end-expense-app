const express = require("express");

const userController = require("../controllers/users");

const router = express.Router();

router.use("/user/sign-up", userController.signUp);

module.exports = router;
