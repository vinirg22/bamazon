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
    var query = "SELECT * FROM products ";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        // looping thru array of product length for response??


        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "Select you product:",
                choices: [
                    "Enter ID of the product you would like to buy:",
                    "How many units of this product would you like to buy?",
                    "Exit",
                ]
                // use switch statement with each case given for user choices
            })
            .then(function (answer) {
                console.log(answer);
                switch (answer.action) {
                    case "Enter ID of the product you would like to buy:":
                        IdSearch();
                        break;

                    case "How many will you buy?":
                        productCount();
                        break;

                    case "Checking product availability:":
                        productCheck();
                        break;

                    case "Exit":
                        connection.end();
                        break;
                }
            });
    });
}
function IdSearch() {
    inquirer
        .prompt({
            name: "products",
            type: "input",
            message: "Select your item:"
            // validate: function(val){
            //     return !isNaN(val) || val.toLocaleLowerCase() === "q"
            // }
            // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        })
        .then(function (res) {
            // console.log(res);
            var query = "SELECT * FROM products WHERE ?";
            // console.log("We're in IdSearch");
            connection.query(query, { id: res.products }, function (err, response) {
                console.table(response);
                if (err) throw err;
                // console.table(res);
                // looping thru array of product length for response??
                // for (var i = 0; i < response.length; i++) {
                //     console.log("product_name: " + response[i].products);
                //   }
                runSearch();
            });

            // if product quantity greater than selected quantity 
            // update the table 

            // otherwise reprompt user

        })
}

function productCount() {
    inquirer
        .prompt({
            name: "products",
            type: "input",
            message: "How many will you buy?"
        })
        // console.log if there is enough products
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?", { stock_quantity: answer.stock_quantity }, function (err, res) {
                if (err) throw err;
                // for (var i = 0; i < res.length; i++) {
                //     console.table("stock_quantity: " + res[i].stock_quantity);
                //   }
                runSearch();
            });
        });
}
function productCheck() {
    inquirer
        .prompt({
            name: "products",
            type: "input",
            message: "Let's check if we have what you need:"
        })
        .then(function (answer) {
            connection.query(query, { id: res.products }, function (err, response) {
                console.table(response);
                if (err) throw err;

            });
        });
}
//
// consolo.log both functions...

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
