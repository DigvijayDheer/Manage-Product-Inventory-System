const { Product, Warehouse } = require("../models/models.js");

// addStock(123456, "100001", 50);
const addStock = async (sku, warehouseNumber, quantity) => {
  try {
    // Check if the SKU exists in the product catalog
    const product = await Product.findOne({ sku });
    if (!product) {
      throw new Error("Invalid SKU");
    }

    // Check if the warehouse exists
    const warehouse = await Warehouse.findOne({ warehouseNumber });
    if (!warehouse) {
      throw new Error("Invalid warehouse number");
    }

    // Calculate the available stock space in the warehouse
    const availableSpace = warehouse.stockLimit - warehouse.currentStock;

    // Calculate the actual stock to be added considering the available space and requested quantity
    const stockToAdd = Math.min(quantity, availableSpace);

    // Update the warehouse's current stock
    warehouse.currentStock += stockToAdd;

    // Raise a warning if the stock limit will be exceeded by this shipment
    if (warehouse.currentStock > warehouse.stockLimit) {
      console.warn("Stock limit will be exceeded");
    }

    // Save the updated warehouse and return the stock added
    await warehouse.save();

    console.log(
      `Stock added successfully. Added ${stockToAdd} units of SKU ${sku} to warehouse ${warehouseNumber}`
    );
  } catch (error) {
    console.error("Failed to add stock:", error.message);
  }
};

module.exports = addStock;
