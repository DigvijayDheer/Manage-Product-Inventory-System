const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  sku: {
    type: Number,
    required: true,
  },
  orderQuantity: {
    type: Number,
    required: true,
  },
  customerLocation: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  fulfillmentStatus: {
    type: String,
    default: "Pending",
  },
  // Other fields specific to the Order schema
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
