const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    const id = jwt.verify(token, "123456789");
    console.log(id.userId);
    User.findByPk(id.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
