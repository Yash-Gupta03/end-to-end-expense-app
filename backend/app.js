const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const userRoutes = require("./routers/user");
const cors = require("cors");
const Expense = require("./models/expense");
const User = require("./models/user");

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then()
  .catch((err) => console.log(err));

app.listen(3000);
