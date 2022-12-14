const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const winnerSchema = new Schema(
  {
    user: String,
    prizeAmount: String,
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Winners = mongoose.model('Winners', winnerSchema);
module.exports = Winners;
