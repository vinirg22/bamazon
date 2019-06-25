var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonDB"
});
// make connection with mysql database
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});
// write code to run search and list out user choices
function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to buy today?",
            choices: [
                "Enter ID of the product you would like to buy",
                "How many units of this product would you like to buy?",
                "Exit",
            ]
            // use switch statement with each case given for user choices
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Enter ID of the product you would like to buy":
                    IdSearch();
                    break;

                case "How many units of this product would you like to buy?":
                    productCount();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}
function IdSearch() {
    inquirer
        .prompt({
            name: "products",
            type: "input",
            message: "Select your item:"
        })
        .then(function (answer) {
            var query = "SELECT product_name FROM products WHERE ?";
            connection.query(query, { product_name: answer.product_name }, function (err, res) {
                if (err) throw err;
              // looping thru array of product length for response??
                runSearch();
            });

        })
}

function productCount() {
    inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "What many of the items selected would you be buying?"
        })
        .then(function (answer) {
            console.log(answer.song);
            connection.query("SELECT * FROM products WHERE ?", { stock_quantity: answer.stock_quantity }, function (err, res) {
                if (err) throw err;
              // ??
                runSearch();
            });
        });
}


