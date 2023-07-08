const colors = require("colors");
const connectDB = require("./config/db.js");
const { rl, handleCommand } = require("./commands.js");

// Connect to MongoDB
connectDB();

// Set the prompt for the command line interface
rl.setPrompt(colors.green("Enter a command: "));
rl.prompt();

// Handle user input
rl.on("line", (input) => {
  const command = input.trim();
  handleCommand(command);
  rl.prompt();
});

// Handle close event
rl.on("close", () => {
  console.log(colors.yellow("Exiting..."));
  process.exit(0);
});
