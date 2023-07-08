const { Warehouse } = require("../models/models.js");

// listWarehouses();
const listWarehouses = async () => {
  try {
    // Fetch all warehouses
    const warehouses = await Warehouse.find();

    console.log("Warehouse details:", warehouses);
  } catch (error) {
    console.error("Failed to list warehouses:", error.message);
  }
};

module.exports = listWarehouses;
