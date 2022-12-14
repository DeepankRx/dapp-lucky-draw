const Winners = require('../models/winners');
const User = require('../models/user');
exports.addWinner = async (req, res) => {
  const { walletAddress, prizeAmount } = req.body;
  if (!walletAddress || !prizeAmount) {
    return res.status(200).json({
      message: 'Provide all fields',
    });
  }
  try {
    const winner = await Winners.create({
      user: walletAddress,
      prizeAmount,
    });
    return res.status(200).json({
      message: 'Winner added successfully!',
      winner,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.getAllWinners = async (req, res) => {
  try {
    const users = await Winners.find().sort({
      'createdAt':-1
    })
    const winners = [];
    for (let i = 0; i < users.length; i++) {
      const user = await User.findOne({
        walletAddress: users[i].user,
      });

      if (user) {
        const winner = {
          ...user._doc,
          time:users[i].time,
          prizeAmount: users[i].prizeAmount,
        };
        winners.push(winner);
      }
    }
    return res.status(200).json({
      message: 'Winners fetched successfully!',
      winners,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
