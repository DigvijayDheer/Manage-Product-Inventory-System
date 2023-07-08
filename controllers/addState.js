const { State } = require("../models/models.js");

// addState("New York");
const addState = async (stateName) => {
  try {
    // Generate a 2-character state ID
    const stateId = stateName.substring(0, 2).toUpperCase();

    // Check if the state already exists
    const existingState = await State.findOne({ stateName });
    if (existingState) {
      throw new Error("State already exists");
    }

    // Create a new state object
    const newState = new State({
      stateId,
      stateName,
    });

    // Save the new state to the database
    const savedState = await newState.save();

    console.log("State added successfully:", savedState);
  } catch (error) {
    console.error("Failed to add state:", error.message);
  }
};

module.exports = addState;
