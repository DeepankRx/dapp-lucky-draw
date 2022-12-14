const User = require('../models/user');

exports.getAUser = async (req, res) => {
  const { walletAddress } = req.params;
  try {
    const user = await User.findOne({
      walletAddress,
    });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.status(200).json({
      user,
      message: 'User Found',
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Something Went Wrong',
      error: e.message,
    });
  }
};

exports.getMultipleUser = async (req, res) => {
  const { walletAddresses } = req.body;
  if (!walletAddresses)
    return res.status(400).json({
      message: 'Please provide wallet address',
    });
  try {
    // const users = User.find({
    //     //search every user withing array

    // });
    const users = [];
    for (let i = 0; i < walletAddresses.length; i++) {
      const user = await User.findOne({
        walletAddress: walletAddresses[i],
      });
      if (user) {
        users.push(user);
      }
    }
    return res.status(200).json({
      message: 'User fetched successfully!',
      users,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Something Went Wrong',
      error: e.message,
    });
  }
};

exports.addUser = async (req, res) => {
  const { name, phoneNumber, email, address, walletAddress } = req.body;
  if (!name || !phoneNumber || !email || !address || !walletAddress)
    return res.status(400).json({
      message: 'fill all the fields',
    });
  try {
    const user = await User.create({
      name,
      phoneNumber,
      email,
      address,
      walletAddress,
    });
    return res.status(200).json({
      message: 'User added successfully!',
      user,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Something Went Wrong',
      error: e.message,
    });
  }
};
