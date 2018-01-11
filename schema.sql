DROP DATABASE bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
id int NOT NULL AUTO_INCREMENT,
item_id varchar(5) NOT NULL,
product_name varchar(225) NOT NULL,
department_name varchar(255) NOT NULL,
cost int(225) NOT NULL,
msrp int(225) NOT NULL,
stock int(225) NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("CATAN", "Settlers of Catan", "Gateway Game", 30, 54, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("TTRDE", "Ticket to Ride", "Gateway Game", 25, 50, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("CAH01", "Cards Against Humanity", "Gateway Game", 25, 30, 8);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("7WNDR", "7 Wonders", "Middleweight Game", 25, 50, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("BTRYL", "Betrayal at House on the Hill", "Gateway Game", 20, 40, 3);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("WTRDP", "Lords of Waterdeep", "Middleweight Game", 25, 54, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("SCYTH", "Scythe", "Middleweight Game", 40, 80, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("PDMCL", "Pandemic: Legacy", "Middleweight Game", 35, 70, 2);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("SCOVL", "Scoville", "Middleweight Game", 30, 60, 1);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("VSTCC", "Vast: The Crystal Caverns", "Middleweight Game", 25, 50, 1);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("TE4ED", "Twilight Imperium: 4th Edition", "Heavyweight Game", 40, 80, 1);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("GMHVN", "Gloomhaven", "Heavyweight Game", 70, 140, 1);
INSERT INTO products (item_id, product_name, department_name, cost, msrp, stock) VALUES ("KDMON", "Kingdom Death: Monster", "Heavyweight Game", 200, 400, 1);