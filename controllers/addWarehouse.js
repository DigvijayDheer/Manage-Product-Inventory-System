const { Warehouse } = require("../models/models.js");

// addWarehouse("100001", "Warehouse A", "NY", { lat: 40.7128, long: -74.0060 }, 1000);
const addWarehouse = async (
  warehouseNumber,
  warehouseName,
  state,
  location,
  stockLimit
) => {
  try {
    // Check if the warehouse number already exists
    const existingWarehouse = await Warehouse.findOne({ warehouseNumber });
    if (existingWarehouse) {
      throw new Error("Warehouse number already exists");
    }

    // Check if a warehouse already exists within 30km of the provided location
    const nearbyWarehouse = await Warehouse.findOne({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.long, location.lat],
          },
          $maxDistance: 30000, // 30km in meters
        },
      },
    });
    if (nearbyWarehouse) {
      throw new Error(
        "A warehouse already exists within 30km of the provided location"
      );
    }

    // Create a new warehouse object
    const newWarehouse = new Warehouse({
      warehouseNumber,
      warehouseName,
      state,
      location: {
        type: "Point",
        coordinates: [location.long, location.lat],
      },
      stockLimit,
    });

    // Save the new warehouse to the database
    const savedWarehouse = await newWarehouse.save();

    console.log("Warehouse added successfully:", savedWarehouse);
  } catch (error) {
    console.error("Failed to add warehouse:", error.message);
  }
};

module.exports = addWarehouse;
