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
      type: "list",
      message: "Welcome to the Game Shelf!  Feel free to >PERUSE< the collection for a game of your choice.  Let me know when you're ready to >CHECK OUT<.",
      choices: ["PERUSE", "CHECK OUT"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.perusal.toUpperCase() === "PERUSE") {
        accessStock();
      } else {
        addToCart();
      }
    });
}

function accessStock(){
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt({
        name: "action",
        type: "list",
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
            pubSearch();
            break;

          case "Just show me everything, thanks.":
            rangeSearch();
            break;

        }
      });
  });
}

function accessSearch() {
  console.log("|")
  console.log("|   Board games are rated among the community by their accessibility.")
  console.log("|")
  console.log("|   Factors like play time, player count, and mechanical depth are all considered when determining their classification.")
  console.log("|")
  inquirer
    .prompt({
      name: "accessibility",
      type: "list",
      message: "What kind of game are you looking for?",
      choices: [
        "Gateway Game",
        "Middleweight Game",
        "Heavyweight Game"
      ]
    })
    .then(function(answer) {
      var query = "SELECT * FROM products WHERE department_name = ?";
      connection.query( query, [answer.accessibility], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("|  <>  " + res[i].product_name + "  <>  MSRP: $" + res[i].msrp + "   <>  sku: " + res[i].item_id);
        }
      });
    });
  }

function pubSearch() {
  console.log("|")
  console.log("|   We carry a wide variety of games from a multitude of publishers.")
  console.log("|")

  inquirer
    .prompt({
      name: "publisher",
      type: "list",
      message: "Who are you looking to shop from?",
      choices: [
        "Asmodee",
        "Avalon Hill",
        "Cards Against Humanity",
        "Cephalofair",
        "Days of Wonder",
        "Kingdom Death",
        "Leder Games",
        "Repos Production",
        "Stonemeier Games",
        "Tasty Minstrel Games",
        "Wizards of the Coast",
        "Z-Man Games"
      ]
    })
    .then(function(answer) {
      var query = "SELECT * FROM products WHERE publisher = ?";
      connection.query( query, [answer.publisher], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("|  <>  " + res[i].product_name + "  <>  MSRP: $" + res[i].msrp + "   <>  sku: " + res[i].item_id);
        }
      });
    });
  redirector()
  }

function redirector(){
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "|    Purchase an item.",
          "|    Go Back to the beginning"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "|    Purchase an item.":
            addToCart();
            break;

          case "|    Go Back to the beginning":
            start();
            break;

        }
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
