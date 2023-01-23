const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    phoneNumber: Number,
    email: String,
    address: String,
    walletAddress: String,
    profileImage: {
      type: String,
      default: 'https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
