const { Warehouse, Customer } = require("../models/models.js");

// processOrder('customer123', 123456, 10, { lat: 40.7128, long: -74.0060 });
const processOrder = async (
  customerId,
  sku,
  orderQuantity,
  customerLocation
) => {
  try {
    // Check if the customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new Error("Invalid customer ID");
    }

    // Find the nearest warehouse based on customer location
    const nearestWarehouse = await Warehouse.findOne({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [customerLocation.long, customerLocation.lat],
          },
        },
      },
    });

    if (!nearestWarehouse) {
      throw new Error("No warehouses found");
    }

    // Check the stock availability for the requested SKU in the nearest warehouse
    if (nearestWarehouse.currentStock >= orderQuantity) {
      console.log(
        "Order fulfilled from nearest warehouse:",
        nearestWarehouse.warehouseNumber
      );
    } else {
      // Fulfill the order from the next closest warehouse with sufficient stock
      const nextClosestWarehouse = await Warehouse.findOne({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [customerLocation.long, customerLocation.lat],
            },
          },
        },
        currentStock: { $gte: orderQuantity },
        _id: { $ne: nearestWarehouse._id },
      });

      if (!nextClosestWarehouse) {
        throw new Error("Out of stock");
      }

      console.log(
        "Order fulfilled from next closest warehouse:",
        nextClosestWarehouse.warehouseNumber
      );
    }
  } catch (error) {
    console.error("Failed to process order:", error.message);
  }
};

module.exports = processOrder;
