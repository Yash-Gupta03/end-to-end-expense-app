const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

function generateToken(id) {
  return jwt.sign({ userId: id }, "123456789");
}

// Controller for Sign up
exports.signUp = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (
      isStringInvalid(name) ||
      isStringInvalid(email) ||
      isStringInvalid(password)
    ) {
      res.status(400).json({ message: "bad parameters" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      // console.log(err);
      const data = await User.create({
        name: name,
        email: email,
        password: hash,
      });
      res.json({ newUserDetail: data });
    });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

// Controller for Login
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (isStringInvalid(email) || isStringInvalid(password)) {
      res.status(400).json({ message: "bad parameters" });
    }

    const data = await User.findAll({
      where: { email: email },
    });
    // console.log(data[0]);
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (error, result) => {
        if (error) {
          res.status(500).json({ message: "something wrong happened" });
        } else if (result == true) {
          res.status(200).json({
            success: true,
            message: "logged in successfully",
            token: generateToken(data[0].id),
          });
        } else {
          res.status(400).json({ success: false, message: "Wrong Password" });
        }
      });
    } else {
      res.status(404).json({ success: false, message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
