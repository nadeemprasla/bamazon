console.log("Loading...")
const mysql = require('mysql');
const inquirer = require('inquirer');
const bamazonCustomer = require('./Components/bamazonCustomer');
const bamazonManager = require('./Components/bamazonManager');
const password = "nadiq32l";


// connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: password,
//     database: "bamazon_db"
// })
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log(`
//     -----------------------------------------------
//     Connected as ID: ${connection.threadId}
//     -----------------------------------------------
//     `);
// });


function login() {
    inquirer.prompt([{
        type: "list",
        message: "Select platform:",
        name: "platform",
        choices: ["Customer", "Manager", "Supervisor"]
    }]).then(function(login) {
        switch (login.platform) {
            case "Customer":
                platformLogin.customer();
                break;
            case "Manager":
                platformLogin.manager();
                break;
            case "Supervisor":
                platformLogin.supervisor();
                break;
        }
    })
}


var platformLogin = {
    customer: function() {
        bamazonCustomer.customerApp.start();
        task = bamazonCustomer.customerApp.customerOptions();
        switch (task) {
            case "See Items for Sale":
                console.log(task);
                console.log("hello)")
                break;

        }

    },
    manager: function() {
        console.log("hello")

    },
    supervisor: function() {

    }
}


var systemOption = {
    printer: function() {
        // var table = new Table({
        //     head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock'],
        //     colWidths: [100, 200]
        // });
        // console.log(res);
        console.log("hello")

        // res.forEach((object) => {
        //         console.log(object)
        //     })
            // table is an Array, so you can `push`, `unshift`, `splice` and friends
            // table.push(
            //     ['', 'Second value'], ['First value', 'Second value']
            // );

        // console.log(table.toString());
    }


}




login();
module.exports = {login};