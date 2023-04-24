const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../utils/database");


exports.getAllExpenses = async (req, res, next) => {
    const leaderboardDetails = await User.findAll({attributes:['id', 'name', 'totalExpense'],
//     [sequelize.fn('sum', sequelize.col('expenses.price')), 'total_cost'], ], 
// include:[
//     {
//         model:Expense,
//         attribute:[]
//     }
// ], 
// group:['user.id'],
order:[[sequelize.col('totalExpense'), 'DESC']]
})

    
console.log(leaderboardDetails);
leaderboardDetails.sort((a, b) => b.total_cost - a.total_cost)

    res.status(202).json({ expenseLeaderboard: leaderboardDetails});
  };

