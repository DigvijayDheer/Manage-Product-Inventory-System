const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const {
  addProduct,
  addState,
  addStock,
  addWarehouse,
  listProducts,
  listWarehouses,
  processOrder,
  viewOrder,
  viewState,
  warehouseInfo,
} = require("./controllers/controllers.js");

function handleCommand(command) {
  const args = command.split(" ");
  const commandName = args[0].toUpperCase();

  switch (commandName) {
    case "ADD":
      handleAddCommand(args);
      break;
    case "STOCK":
      handleStockCommand(args);
      break;
    case "VIEW":
      handleViewCommand(args);
      break;
    case "PROCESS":
      handleProcessCommand(args);
      break;
    case "LIST":
      handleListCommand(args);
      break;
    case "WAREHOUSE":
      handleWarehouseCommand(args);
      break;
    default:
      console.log("Invalid command.");
  }
}

function handleAddCommand(args) {
  const subCommand = args[1].toUpperCase();

  switch (subCommand) {
    case "PRODUCT":
      const productName = args[2];
      const skuId = parseInt(args[3]);
      const category = args[4];
      const subCategory = args[5];
      const imageLink = args[6] || null;
      addProduct(productName, skuId, category, subCategory, imageLink);
      break;
    case "WAREHOUSE":
      const warehouseNumber = args[2];
      const warehouseName = args[3];
      const state = args[4];
      const location = args[5];
      const stockLimit = args[6] || null;
      addWarehouse(warehouseNumber, warehouseName, state, location, stockLimit);
      break;
    case "STATE":
      const newState = args[2];
      addState(newState);
      break;
    default:
      console.log("Invalid 'add' command.");
  }
}

function handleStockCommand(args) {
  const sku = parseInt(args[1]);
  const warehouseNumber = args[2];
  const qty = parseInt(args[3]);
  addStock(sku, warehouseNumber, qty);
}

function handleViewCommand(args) {
  const subCommand = args[1].toUpperCase();

  switch (subCommand) {
    case "STATE":
      viewState();
      break;
    case "ORDERS":
      viewOrder();
      break;
    default:
      console.log("Invalid 'view' command.");
  }
}

function handleProcessCommand(args) {
  const customerId = args[1];
  const sku = parseInt(args[2]);
  const orderQty = parseInt(args[3]);
  const customerLocation = args[4];
  processOrder(customerId, sku, orderQty, customerLocation);
}

function handleListCommand(args) {
  const subCommand = args[1].toUpperCase();

  switch (subCommand) {
    case "PRODUCTS":
      listProducts();
      break;
    case "WAREHOUSES":
      listWarehouses();
      break;
    default:
      console.log("Invalid 'list' command.");
  }
}

function handleWarehouseCommand(args) {
  const warehouseNumber = args[1];
  warehouseInfo(warehouseNumber);
}

rl.setPrompt("Enter a command: ");
rl.prompt();

rl.on("line", (input) => {
  const command = input.trim();
  handleCommand(command);
  rl.prompt();
});

rl.on("close", () => {
  console.log("Exiting...");
  process.exit(0);
});

// Export rl and handleCommand function
module.exports = {
  rl,
  handleCommand,
};
