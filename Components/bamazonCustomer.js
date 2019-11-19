var bamazonMain = require('../bamazonMain');
var inquirer = require('inquirer');
var mysql = require('mysql');
const password = "nadiq32l";
const Table = require('cli-table');



var data = [];

var customerApp = {
    start: function() {
        console.log("You are now in the Customer Platform");
        this.createCon();
    },
    customerOptions: function() {
        inquirer.prompt([{
            type: "list",
            choices: ["See Items for Sale", "Purchase an Item", "Exit"],
            message: "What would you like to do?",
            name: "options"
        }, ]).then((event) => {
            // this.productGen();
            this.productGen();
            setTimeout(() => {
                switch (event.options) {
                    case "See Items for Sale":
                        this.productGen();
                        setTimeout(() => {
                            this.customerOptions();

                        }, 100);
                        break;
                    case "Purchase an Item":
                        this.purchaser();
                        break;
                    case "Exit":
                        bamazonMain.login();
                }
            }, 500)

        })
    },
    createCon: function() {
        connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: password,
            database: "bamazon_db"
        })
        connection.connect(function(err) {
            if (err) throw err;
        });

    },
    productGen: function() {
        data = [];
        connection.query(`SELECT * FROM bamazon_db.products;`, (err, res) => {
            err ? console.log(err) : null;
            this.printer(res)
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
        console.log(`
                
        `)
    },
    purchaser: function() {
        itemArray = [];
        data.forEach(element => {
            itemArray.push(data.indexOf(element) + 1);
        });
        inquirer.prompt([{
            type: "list",
            choices: itemArray,
            message: "Which item would you like to purchase?",
            name: "itemNum"
        }]).then((e) => {
            selectedItem = data[(e.itemNum - 1)];
            var selItem = new Table();
            selItem.push({ 'Item ID': selectedItem[0] }, { 'Product Name': selectedItem[1] }, { 'Department': selectedItem[2] }, { 'Price': selectedItem[3] }, { 'Stock': selectedItem[4] });
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
                console.log(newAmount);
                connection.query(`
                UPDATE bamazon_db.products
                SET stock_quantity = ${newAmount}
                WHERE item_id = ${selectedItem[0]}
                `, (err) => {
                    err ? console.log(err) : null;
                    data.map((array => {
                        if (array[0] === selectedItem[0]) {
                            array[4] = newAmount;
                            console.log(array);
                            return array
                        } else { return array }
                    }))
                    this.productGen();
                    setTimeout(() => {
                        this.customerOptions();
                    }, 500);
                })

            })
        })
    }
}








module.exports = { customerApp };