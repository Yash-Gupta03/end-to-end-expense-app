const User = require("../models/user");
const bcrypt = require("bcrypt");

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

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
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (error, result) => {
        if (error) {
          res.status(500).json({ message: "something wrong happened" });
        } else if (result == true) {
          res
            .status(200)
            .json({ success: true, message: "logged in successfully" });
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
