console.log("Loading...")
const mysql = require('mysql');
const inquirer = require('inquirer');
const bamazonCustomer = require('./Components/bamazonCustomer');
const bamazonManager = require('./Components/bamazonManager');
const password = "nadiq32l";


connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "bamazon_db"
})
connection.connect(function(err) {
    if (err) throw err;
    console.log(`
    -----------------------------------------------
    Connected as ID: ${connection.threadId}
    -----------------------------------------------
    `);
    console.log(connection.threadId);
    login();

    
});
    
    
function login() {
    inquirer.prompt([{
        type: "list",
        message: "Select platform:",
        name: "platform",
        choices: ["Customer", "Manager", "Supervisor"]
    }]).then(function(login) {
        platformLogin.customer();
    })
}


var platformLogin = {
    customer: function() {
        bamazonCustomer.customerApp.start()
    },
    manager: function() {
        console.log("hello")

    },
    Supervisor: function() {

    }
}

module.exports = { platformLogin, login }