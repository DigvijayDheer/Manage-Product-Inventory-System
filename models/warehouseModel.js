const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  warehouseNumber: {
    type: String,
    unique: true,
    required: true,
  },
  warehouseName: {
    type: String,
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  stockLimit: {
    type: Number,
    default: Infinity,
    required: true,
  },
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
