const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const userRoutes = require("./routers/user");
const expenseRoutes = require('./routers/expense');
const purchaseRoutes = require('./routers/purchase');
const premiumRoutes = require('./routers/premium');
const passwordRoutes = require('./routers/password');


const cors = require("cors");
const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/order");
const ForgotPasswordRequests = require('./models/forgotpasswordrequests');

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes)
app.use('/password', passwordRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

sequelize
  .sync()
  .then()
  .catch((err) => console.log(err));

app.listen(3000);
