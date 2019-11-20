# Bamazon

## Overview

The purpose of this project is to provide a Amazon-like storefront using mySQL, Node, NPM, and JS. At the start of the application, you will have the ability to select switch platform you would like to access: Customer, Manager and Supervisor(TBD). Depending on the platform selected, you will have the ability to see inventory items that are stored in the database and be able to interact with that data that is displayed on the console.


The instructions below will guide you to run the project on your llocal machine. Project still in development. Supervisor platform still in progress.

### Prerequisites

1. You device will need the following: Node, MySQL Server and MySQL WorkBench. Instructions to install below:
    *   Node: https://nodejs.org/en/download/

    *   MySQL Server: https://dev.mysql.com/downloads/windows/installer/8.0.html
        1.  Select Windows (x86, 32-bit), MSI Installer (16.3 M)
        2.  Click "No thanks, just start my download."
        3.  Navigate to where the file was downloaded and double-click to run the installer. If you get prompted for an update, proceed with the upgrade.
        4.  When you get to the License Agreement screen, Accept the license terms and click "Next"
        5.  Click the "+" next to "MySQL Servers" to expand it, expand "MySQL Server", expand "MySQL Server 8.0", and finally select "MySQL Server 8.0.12 – X64" and click the right arrow to add it to the "Products/Features To Be Installed" section.
        6.  Click "Execute"
        7.  When the status says "Complete", click "Next".
        8.  At the product configuration screen, click "Next" again.
        9.  Select "Standalone MySQL Server / Classic MySQL Replication" and click "Next"
        10. For Type and Networking, don't change anything and click "Next"
        11. IMPORTANT: Make sure to select "Use Legacy Authentication Method (Retain MySQL 5.x Compatibility) and click "Next"
        12. Create a root password. WARNING. Do not forget this password! After entering a password, click "Next"
        13. When you get to the Windows Service screen, don't change anything and click "Next"
        14. Finally, click "Execute" to apply the changes.
        15. You can verify that the installation was correct by going to Git Bash and typing "mysql –V". The path followed by the version should show up.

    *   MySQL Workbench Install (Windows)
        1. Head to https://dev.mysql.com/downloads/workbench/
        2.  Select Microsoft Windows in the dropdown.
        3.  Scroll down and in Other Downloads: find Windows (x86, 64-bit), MSI Installer and click "Download".
        4.  Click "No thanks, just start my download."
        5.  Open the executable file and go through the installation process.



### Installing

Using my MySQL WorkBench, create a local server using the parameters in the image:
![MySQL server settings](https://github.com/nadeemprasla/bamazon/blob/master/Images/mySQL%20local%20instance.JPG)

Run the MySQL code below to generate bamazon_db and tables with example data.

```
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER NOT NULL KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER,
    stock_quantity INTEGER);
    
    
    

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Electronics", "1000","150"),
("4K TV", "Electronics", "2000", "10"),
("iPod", "Electronics", "100", "100"),
("Switch", "Electronics", "415", "10"),
("Xbox", "Electronics", "400", "20"),
("PC", "Electronics", "3000", "5"),
("Cheetos", "Chips", "3", "20"),
("Kettle Jalapeno", "Chips", "2", "9"),
("Almond Joy", "Candy", "1", "30"),
("Kit Kat", "Candy", "1", "30"),
("Cadbury", "Candy", "1", "50"),
("Nike", "Shoes", "120", "15"),
("Air Pods", "Electronics", "175", "3"),
("USB wire", "Electronics", "3", "2"),
("HDMI wire", "Electronics", "45", "2"),
("TNT", "Dangerous Products", "175", "20")
;

```

The next steps will help you initialize the application by installing necessary packages.

```
1.  Clone github repo to your device and run "npm i" in the root folder, which will download dependencies associated to this project.
2.  In the command window, run "node bamazonMain.js [password]" and replace password/brackets with password from MySQL server setup above. 
```

## Authors

* **Nadeem Prasla**
