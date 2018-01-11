var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "cosu",
  password: "csulli0892",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "perusal",
      type: "rawlist",
      message: "Welcome!  Feel free to >PERUSE< the collection for a game of your choice.  Let me know when you're ready to >CHECK OUT<.",
      choices: ["PERUSE", "CHECK OUT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.perusal.toUpperCase() === "PERUSE") {
        showStock();
      } else {
        addToCart();
      }
    });
}

function showStock(){
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Find games by accessibility",
          "Find games by publisher",
          "find games by name"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Find games by accessibility":
            accessSearch();
            break;

          case "Find games by publisher":
            multiSearch();
            break;

          case "Find games by name":
            rangeSearch();
            break;

        }
      });
  });
}

function accessSearch() {
  inquirer
    .prompt({
      name: "accessibility",
      type: "rawlist",
      message: "What level of accessibility would you like?"
      choices: [
        "Gateway Games",
        "Middleweight Games",
        "Heavyweight Games"
      ]
    })
    .then(function(answer) {
      var query = "SELECT title, msrp, accessibility FROM bamazon WHERE ?";
      connection.query(query, { accessibility: answer.accessibility }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(" || Title: " + res[i].product_name + " || MSRP: $" + res[i].msrp);
        }
        runSearch();
      });
    });
}



function addToCart(){
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
    inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_name);
          }
          return choiceArray;
        }
      },
      {
        message: "What auction would you like to place a bid in?"
      },
      {
        name: "bid",
        type: "input",
        message: "How much would you like to bid?"
      }
    ]);
  });
}
