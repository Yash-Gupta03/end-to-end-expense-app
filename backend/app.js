const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const userRoutes = require("./routers/user");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);

sequelize
  .sync()
  .then()
  .catch((err) => console.log(err));

app.listen(3000);
