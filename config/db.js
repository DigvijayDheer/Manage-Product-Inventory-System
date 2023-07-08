const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MongoDB connection string
    const connectionString = "mongodb://localhost:27017/gokart";

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
