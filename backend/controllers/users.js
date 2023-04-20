const User = require("../models/user");

function isStringValid(string) {
  if (string != null && string.length > 0) {
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
      isStringValid(name) &&
      isStringValid(email) &&
      isStringValid(password)
    ) {
      const data = await User.create({
        name: name,
        email: email,
        password: password,
      });
      res.json({ newUserDetail: data });
    } else {
      res.status(500).json({ message: "bad parameters" });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const data = await User.findAll({
      where: { email: email },
    });
    if (data.length > 0) {
      if (data[0].password == password) {
        res
          .status(200)
          .json({ success: true, message: "logged in successfully" });
      } else {
        res.status(400).json({ success: false, message: "Wrong Password" });
      }
    } else {
      res.status(404).json({ success: false, message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
