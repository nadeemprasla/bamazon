var bamazonMain = require('../bamazonMain');
var inquirer = require('inquirer');
var mysql = require('mysql');
const password = "nadiq32l";
const Table = require('cli-table');



var data = [];

var customerApp = {
    customerOptions: function(login) {
        inquirer.prompt([{
            type: "list",
            choices: ["See Products for Sale", "Purchase an Item", "Exit"],
            message: "What would you like to do?",
            name: "options"
        }, ]).then((event) => {
            this.productGen(event.options, login);
        })
    },
    productGen: function(event, login) {
        data = [];
        connection.query(`SELECT * FROM bamazon_db.products;`, (err, res) => {
            err ? console.log(err) : null;
            this.printer(res)
            switch (event) {
                case "See Products for Sale":
                    this.customerOptions(login);
                    break;
                case "Purchase an Item":
                    this.purchaser(login);
                    break;
                case "Exit":
                    connection.end();
                    login();
                    break;
            }
        })
    },
    printer: function(res) {
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock'],
            colWidths: [10, 40, 40, 20, 10]
        });
        var newarray = []
        res.forEach((object) => {
            newarray = [];
            newarray.push(object.item_id, object.product_name, object.department_name, object.price, object.stock_quantity)
            table.push(newarray);
            data.push(newarray)
        })


        console.log(`
        
            `)
        console.log(table.toString());
        console.log(`        `)
    },
    purchaser: function(login) {
        itemArray = [];
        data.forEach(element => {
            itemArray.push(data.indexOf(element) + 1);
        });
        inquirer.prompt([{
            type: "list",
            choices: itemArray,
            message: "Which item would you like to purchase?(Item ID)",
            name: "itemNum"
        }]).then((e) => {
            selectedItem = data[(e.itemNum - 1)];
            var selItem = new Table();
            selItem.push({ 'Item ID': selectedItem[0] }, { 'Product Name': selectedItem[1] }, { 'Department': selectedItem[2] }, { 'Price': selectedItem[3] }, { 'Stock': selectedItem[4] });
            console.log(`
You have selected:
 `)
            console.log(selItem.toString());
            return selectedItem
        }).then(selectedItem => {
            inquirer.prompt([{
                type: "input",
                message: "How many would you like to purchase?(Enter Zero to not purchase)",
                validate: function(amount) {
                    if (parseInt(amount) <= selectedItem[4] && parseInt(amount) >= 0) {
                        return true
                    }
                },
                name: "amountPurchase"
            }]).then(amt => {
                newAmount = selectedItem[4] - parseInt(amt.amountPurchase)
                console.log(`
You have purchased: ${amt.amountPurchase} quantity of ${selectedItem[1]}
`);
                connection.query(`
                UPDATE bamazon_db.products
                SET stock_quantity = ${newAmount}
                WHERE item_id = ${selectedItem[0]}
                `, (err) => {
                    err ? console.log(err) : null;
                    data.map((array => {
                        if (array[0] === selectedItem[0]) {
                            array[4] = newAmount;
                            // console.log(array);
                            return array
                        } else { return array }
                    }))
                    this.customerOptions(login);
                })

            })
        })
    }
}








module.exports = { customerApp };