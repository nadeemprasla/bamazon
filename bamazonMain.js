console.log("Loading...")
const mysql = require('mysql');
const inquirer = require('inquirer');
const bamazonCustomer = require('./Components/bamazonCustomer');
const bamazonManager = require('./Components/bamazonManager');
const password = "nadiq32l";


function login() {
    inquirer.prompt([{
        type: "list",
        message: "Select platform:",
        name: "platform",
        choices: ["Customer", "Manager", "Supervisor", "Exit"]
    }]).then(function(login) {
        switch (login.platform) {
            case "Customer":
                console.log(`                -------------------------------------
                You are now in the Customer Platform
                -------------------------------------
                `);
                platformLogin.customer();
                break;
            case "Manager":
                console.log(`                -------------------------------------
                You are now in the Manager Platform
                -------------------------------------
                `);
                platformLogin.manager();
                break;
            case "Supervisor":
                console.log(`                -------------------------------------
                You are now in the Supervisor Platform
                -------------------------------------
                `);
                platformLogin.supervisor();
                break;
            case "Exit":
                () => { process.exit() }
                break;
        }
    })
}


var platformLogin = {
    customer: function() {
        amConnected = false;
        if (!amConnected) {
            connection = mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "root",
                password: password,
                database: "bamazon_db"
            })
            connection.connect(function(err) {
                if (err) throw err;
                // console.log("ThreadID: ", connection.threadId);
                amConnected = true;
                bamazonCustomer.customerApp.customerOptions(() => { login() })
            });
        };
    },
    manager: function() {
        amConnected = false;
        if (!amConnected) {
            connection = mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "root",
                password: password,
                database: "bamazon_db"
            })
            connection.connect(function(err) {
                if (err) throw err;
                // console.log("ThreadID: ", connection.threadId);
                amConnected = true;
                bamazonManager.managerApp.managerOptions(() => { login() })
            });
        };
    },
    supervisor: function() {

    }
}






login();
module.exports = { login, platformLogin };