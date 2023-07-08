const { Product, Warehouse } = require("../models/models.js");

// warehouseInfo('100001');
const warehouseInfo = async (warehouseNumber) => {
  try {
    // Find the warehouse with the given warehouse number
    const warehouse = await Warehouse.findOne({ warehouseNumber });

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    // Fetch the available SKUs in the warehouse
    const skus = await Product.find({ _id: { $in: warehouse.products } });

    console.log("Warehouse info:", {
      warehouseId: warehouse._id,
      availableSKUs: skus,
      availableStorage:
        warehouse.stockLimit === -1 ? "Unlimited" : warehouse.stockLimit,
    });
  } catch (error) {
    console.error("Failed to get warehouse info:", error.message);
  }
};

module.exports = warehouseInfo;
