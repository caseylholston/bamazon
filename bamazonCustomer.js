var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Makaveli05',
    database: 'BamazonDB'
});

connection.connect(function(err){
    if(err) throw err;
    console.log('connected as id '+ connection.threadId);
});
//Connect to the products database and show all products data
connection.query('SELECT * FROM products', function (err, res){
    for (var i = 0; i < res.length; i++) {
    console.log('Item ID: ' + res[i].item_id + "|" + 'Product Name: ' + res[i].product_name + " | " + 'Department: ' + res[i].department_name + " | " + 'Price: $' + res[i].price + " | " + 'Quantity in Stock: ' + res[i].stock + '\n' );
    }
    console.log('---------------------------------------');
});

//-------------QUESTION PROMPTS-------------------

var initialQuestions = [
    {
        type:'input',
        name:'itemID',
        message:'What product would you like to purchase?'
    },
    {
        type:'input',
        name:'itemQuantity',
        message:'How many would you like to purchase?'
    },   
    ];

//-------------END OF QUESTION PROMPTS-------------------    

//-------------BEGIN CUSTOMER OUTPUT-------------------
 inquirer.prompt(initialQuestions).then(function (answers){
        connection.query('SELECT * FROM products WHERE itemID=?', [answers.itemID], function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log('Item ID: ' + res[i].item_id + "|" + 'Product Name: ' + res[i].product_name + " | " + 'Department: ' + res[i].department_name + " | " + 'Price: $' + res[i].price + " | " + 'Quantity in Stock: ' + res[i].stock + '\n' );
            }
        });
});