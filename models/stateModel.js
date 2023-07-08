const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  stateId: {
    type: String,
    required: true,
    unique: true,
  },
  stateName: {
    type: String,
    required: true,
  },
});

const State = mongoose.model("State", stateSchema);

module.exports = State;
