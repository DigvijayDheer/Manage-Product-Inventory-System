const { Warehouse } = require("../models/models.js");

// viewState();
const viewState = async () => {
  try {
    // Aggregate query to get the count of warehouses per state
    const warehouseCountByState = await Warehouse.aggregate([
      {
        $group: {
          _id: "$state",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get the total stock capacity per state
    const totalStockCapacityByState = await Warehouse.aggregate([
      {
        $group: {
          _id: "$state",
          totalCapacity: { $sum: "$stockLimit" },
        },
      },
    ]);

    // Fetch all states from the State collection
    const states = await State.find();

    // Combine the state details with warehouse count and total stock capacity
    const stateDetails = states.map((state) => {
      const warehouseCount = warehouseCountByState.find((item) =>
        item._id.equals(state._id)
      );
      const totalCapacity = totalStockCapacityByState.find((item) =>
        item._id.equals(state._id)
      );

      return {
        stateName: state.stateName,
        stateCode: state.stateId,
        warehouseCount: warehouseCount ? warehouseCount.count : 0,
        totalStockCapacity: totalCapacity ? totalCapacity.totalCapacity : 0,
      };
    });

    console.log("State details:", stateDetails);
  } catch (error) {
    console.error("Failed to view state details:", error.message);
  }
};

module.exports = viewState;
