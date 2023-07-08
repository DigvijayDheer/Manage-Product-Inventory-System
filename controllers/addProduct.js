const { Product } = require("../models/models.js");

// addProduct("iPhone 12", 123456, "Electronics", "Mobile Phones", "image-link.jpg");
const addProduct = async (
  productName,
  skuId,
  category,
  subCategory,
  imageLink
) => {
  try {
    // Check if the SKU already exists in the product catalog
    const existingProduct = await Product.findOne({ sku: skuId });
    if (existingProduct) {
      throw new Error("SKU already exists");
    }

    // Create a new product object
    const newProduct = new Product({
      name: productName,
      sku: skuId,
      category,
      subCategory,
      imageLink,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    console.log("Product added successfully:", savedProduct);
  } catch (error) {
    console.error("Failed to add product:", error.message);
  }
};

module.exports = addProduct;
