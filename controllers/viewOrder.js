const { Order } = require("../models/models.js");

// viewOrders();
const viewOrders = async () => {
  try {
    // Fetch all orders with populated customer and warehouse details
    const orders = await Order.find()
      .populate("customerId", "customerId")
      .populate("warehouse", "warehouseNumber");

    const orderDetails = orders.map((order) => {
      return {
        customerId: order.customerId.customerId,
        orderData: {
          sku: order.sku,
          orderQuantity: order.orderQuantity,
          customerLocation: order.customerLocation,
        },
        fulfillmentStatus: order.fulfillmentStatus,
        linkedWarehouse: order.warehouse.warehouseNumber,
      };
    });

    console.log("Orders:", orderDetails);
  } catch (error) {
    console.error("Failed to view orders:", error.message);
  }
};

module.exports = viewOrders;
