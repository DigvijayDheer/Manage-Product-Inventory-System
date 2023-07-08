# Manage Product Inventory System

The Manage Product Inventory System is a command-line application built to manage products, warehouses, orders, and more. It provides functionality to add products, warehouses, process orders, view information, and perform other inventory-related operations.

## Features

- Add new products with details such as name, SKU, category, and image.
- Add warehouses with information including the warehouse number, name, state, location, and stock limit.
- Track stock levels and manage stock quantities for products in different warehouses.
- Process customer orders and update stock levels accordingly.
- View state information and order details.
- List products and warehouses for easy inventory management.

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version X.X.X or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or accessible via connection string)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/manage-product-inventory-system.git
```

2. Change to the project directory:

```bash
cd manage-product-inventory-system
```

3. Install dependencies:

```bash
npm install
```

4. Configure the database connection:

- Open the `db.js` file located in the project root.
- Update the `connectionString` variable with your MongoDB connection string.

5. Start the application:

```bash
npm start
```

## Usage

Enter commands at the prompt to perform various operations. Here are the available commands:

### Add a product

`ADD PRODUCT <productName> <skuId> <category> <subCategory> <imageLink>`

- Example:

```bash
ADD PRODUCT Apple 12345 Fruits Red delicious-apple.jpg
```

### Add a warehouse

`ADD WAREHOUSE <warehouseNumber> <warehouseName> <state> <location> <stockLimit>`

- Example:

```bash
ADD WAREHOUSE W001 Warehouse1 State1 Location1 100
```

### Add a state

`ADD STATE <newState>`

- Example:

```bash
ADD STATE State1
```

### Add stock to a warehouse

`STOCK <sku> <warehouseNumber> <quantity>`

- Example:

```bash
STOCK 12345 W001 50
```

### View state information

- Example:

```bash
STOCK 12345 W001 50
```

### View order information

- Example:

```bash
VIEW ORDERS
```

### Process an order

`PROCESS <customerId> <sku> <orderQty> <customerLocation>`

- Example:

```bash
PROCESS C001 12345 10 Location1
```

### List all products

- Example:

```bash
LIST PRODUCTS
```

### List all warehouses

- Example:

```bash
LIST WAREHOUSES
```

### Get warehouse information

`WAREHOUSE <warehouseNumber>`

- Example:

```bash
WAREHOUSE W001
```

- Refer to the COMMANDS.md file for detailed information on each command and their usage.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

```

You can copy and paste the above content into your `README.md` file. Feel free to modify or enhance it to better suit your project.
```
