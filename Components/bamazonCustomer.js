var inquirer = require('inquirer');
var mysql = require('mysql')
var connection = require('./connection');


var customerApp = {
    start: function() {
        console.log("You are now in the Customer Platform");
        customerApp.customerOptions();
    },
    customerOptions: function () {
        inquirer.prompt([
            {
                type: "list",
                choices: ["See Items for Sale"],
                message: "What would you like to do?",
                name: "options"
            },
        ]).then((event)=> {
            console.log(event.options)
            customerApp.productList()
        })
    },
    productList: function () {
        console.log(connection.threadId)
        connection.query(`SELECT * FROM bamazon_db.products;`,(err, res)=>{
            err ? console.log(err) : null; 
            console.log(res)

        })
        
    }
}











module.exports = {customerApp};