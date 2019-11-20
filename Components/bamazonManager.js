var bamazonMain = require('../bamazonMain');
var inquirer = require('inquirer');
var mysql = require('mysql');
const password = process.argv[2];
const Table = require('cli-table');



var data = [];

var managerApp = {
    managerOptions: function(login) {
        inquirer.prompt([{
            type: "list",
            choices: ["See Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
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
                    this.managerOptions(login);
                    break;
                case "View Low Inventory":
                    this.lowInventory(login);
                    break;
                case "Add to Inventory":
                    this.addInv(login);
                    break;
                case "Add New Product":
                    this.newItem(login);
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
    addInv: function(login) {
        itemArray = [];
        data.forEach(element => {
            itemArray.push(data.indexOf(element) + 1);
        });
        inquirer.prompt([{
            type: "list",
            choices: itemArray,
            message: "Which item would you like to add/remove to?(Item ID)",
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
                message: "How many units would you like to add/remove to inventory?(Enter negative num to remove)",
                validate: function(amount) {
                    if (parseInt(amount)) {
                        return true
                    }
                },
                name: "amountPurchase"
            }]).then(amt => {
                newAmount = selectedItem[4] + parseInt(amt.amountPurchase)
                if (parseInt(amt.amountPurchase) >= 0) {
                    console.log(`
    You have added: ${amt.amountPurchase} quantity of ${selectedItem[1]}
    `);
                } else {
                    console.log(`
    You have removed: ${Math.abs(amt.amountPurchase)} quantity of ${selectedItem[1]}
    `);
                }
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
                    this.managerOptions(login);
                })

            })
        })
    },
    lowInventory: function(login) {
        var lowInven = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock'],
            colWidths: [10, 40, 40, 20, 10]
        });
        data.forEach(element => {
            if (element[4] < 10) {
                lowInven.push(element)
            }
        });
        console.log(`
Low Inventory Items(Less than 10):
 `)
        console.log(lowInven.toString());
        this.managerOptions(login);


    },
    newItem: function(login) {
        newItemArray = []
        inquirer.prompt([{
                type: "input",
                message: "Name of item you wish to add?",
                name: "newItemName"
            },
            {
                type: "input",
                message: "Department of item",
                name: "newItemDepart"
            },
            {
                type: "number",
                message: "Cost of item",
                validate: function(amount) {
                    if (parseInt(amount) >= 0) return true;
                },
                name: "newItemCost"
            },
            {
                type: "number",
                message: "Stock of item",
                validate: function(amount) {
                    if (parseInt(amount) >= 0) return true;
                },
                name: "newItemStock"
            }
        ]).then((res) => {
            var addedNewItem = new Table();
            addedNewItem.push({ 'Product Name': res.newItemName }, { 'Department': res.newItemDepart }, { 'Price': res.newItemCost }, { 'Stock': res.newItemStock });

            console.log(`
You have new Item:
 `)
            console.log(addedNewItem.toString());
            return res
        }).then(res => {
            values = [res.newItemName, res.newItemDepart, res.newItemCost, res.newItemStock]
            console.log(res);
            if (res.newItemName && res.newItemDepart && (res.newItemCost >= 0) && (res.newItemStock >= 0)) {

                connection.query(`
                INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) 
                VALUES ("${values[0]}","${values[1]}","${values[2]}","${values[3]}");
                `, (err, res) => {
                    err ? console.log(err) : null;
                    console.log("New item added to system")
                })
            }
            this.managerOptions(login);
        })



    },
}








module.exports = { managerApp };