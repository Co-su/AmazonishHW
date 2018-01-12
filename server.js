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
  start();
});

function start() {
  inquirer
    .prompt({
      name: "perusal",
      type: "list",
      message: "Welcome to the Game Shelf!  Feel free to browse the collection for a game of your choice.  Let us know when you're ready to check out!",
      choices: ["CUSTOMER", "MANAGER LOGIN","SUPERVISOR LOGIN"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.perusal.toUpperCase() === "CUSTOMER") {
        accessStock();
      } else if (answer.perusal.toUpperCase() === "MANAGER LOGIN"){
        managerial();
      } else if(answer.perusal.toUpperCase() === "SUPERVISOR LOGIN"){
        supervisory();
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
          "Just show me everything, thanks."
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
            checkout();
            break;

        }
      });
  });
}

function accessSearch() {
  console.log("|")
  console.log("|   Board games are rated among the community by their accessibility.")
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
          redirector();          
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
          redirector();
      });
    });
  }

function redirector(){
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Go to Checkout.",
          "Go Back to the beginning."
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "|    Purchase an item.":
            checkout();
            break;

          case "|    Go back to the beginning":
            start();
            break;
        }
      });
}


function checkout(){
  var query = "SELECT product_name, msrp, stock FROM products";
  connection.query("SELECT product_name, msrp, stock FROM products", function(err, res) {
    if (err) throw err;
    // console.log(res)
      // once you have the items, prompt the user for which they'd like to bid on
    inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "GameShelf has the following titles available:",
        choices: function() {
          var choiceArray = [];
          connection.query("SELECT product_name, msrp, stock FROM products", function(err, res) {
                for (var i = 0; i < res.length; i++) {
                choiceArray.push("|  <>  " + res[i].product_name + "  <>  MSRP: $" + res[i].msrp + "   <>  stock: " + res[i].stock);
                }
              return choiceArray;
            });
          }
        }
      ]);
    })
  };
