const User = require("../models/user");

exports.signUp = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const data = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.json({ newUserDetail: data });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const data = await User.findAll({
      where: { email: email, password: password },
    });
    if (!data) {
      res.json({ message: "Wrong Credentials" });
    } else {
      res.json({ message: "Logged in" });
    }
    // res.json({ allUserDetails: data });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
