const { Product, Warehouse } = require("../models/models.js");

// listProducts();
const listProducts = async () => {
  try {
    // Fetch all products
    const products = await Product.find();

    // Create an array to store product details
    const productDetails = [];

    // Iterate over each product
    for (const product of products) {
      // Fetch the warehouses where the product is in stock
      const warehouses = await Warehouse.find({
        currentStock: { $gt: 0 },
        products: product._id,
      });

      // Create an array to store warehouse details
      const warehouseDetails = warehouses.map((warehouse) => ({
        warehouseId: warehouse._id,
        state: warehouse.state,
        location: warehouse.location,
      }));

      // Push product details to the productDetails array
      productDetails.push({
        productName: product.productName,
        currentStock: product.currentStock,
        inStockWarehouses: warehouseDetails,
      });
    }

    console.log("Product details:", productDetails);
  } catch (error) {
    console.error("Failed to list products:", error.message);
  }
};

module.exports = listProducts;
