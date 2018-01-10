/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Create the database day_planner_db and specified it for use.
CREATE DATABASE bamazon;
USE bamazon;

-- Create the table plans.
CREATE TABLE products
(
id int NOT NULL AUTO_INCREMENT,
item_id varchar(5) NOT NULL,
product_name varchar(255) NOT NULL,
department_name varchar(255) NOT NULL,
cost int(1000) NOT NULL,
msrp int(1000) NOT NULL,
stock int(1000) NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("CATAN", "Settlers of Catan", "Asmodee", 30, 54, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("TTRDE", "Ticket to Ride", "Days of Wonder", 25, 50, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("CAH01", "Cards Against Humanity", "CAH Company", 25, 30, 4);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("7WNDR", "7 Wonders", "Asmodee", 25, 50, 1);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("BTRYL", "Betrayal at House on the Hill", "Avalon Hill", 20, 40, 1);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("WTRDP", "Lords of Waterdeep", "Avalon Hill", 25, 54, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("SCYTH", "Scythe", "Stonemeier Games", 40, 80, 1);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("PDMCL", "Pandemic: Legacy", "Z-Man Games", 35, 70, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("SCOVL", "Scoville", "Tasty Minstrel Games", 30, 60, 1);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("VSTCC", "Vast: The Crystal Caverns", "Leder Games", 25, 50, 1);