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
    var itemData = res
    for (var i = 0; i < res.length; i++) {
    console.log('Item ID: ' + res[i].item_id + "|" + 'Product Name: ' + res[i].product_name + " | " + 'Department: ' + res[i].department_name + " | " + 'Price: $' + res[i].price + " | " + 'Quantity in Stock: ' + res[i].stock + '\n' );
};
    console.log('---------------------------------------');
    questionOne();

});



//-------------QUESTION PROMPTS-------------------

var customerQuestions = [
    {
        type:'input',
        name:'itemID',
        message:'What product would you like to purchase? -- Please type the Item ID and Press ENTER'
    },
    {
        type:'input',
        name:'itemQuantity',
        message:'How many would you like to purchase? -- Please type the quantity and Press Enter'
    }   
    ];

//-------------END OF QUESTION PROMPTS-------------------    

//-------------BEGIN CUSTOMER OUTPUT-------------------
function questionOne() {inquirer.prompt(customerQuestions).then(function (answers){
        connection.query('SELECT * FROM products WHERE item_id=?', [answers.itemID], function(err, data) {
            console.log(answers.itemID);
            console.log(answers.itemQuantity);
            console.log('Item ID Results: '+ data);
            var newQuantity = parseInt(data[0].stock) - parseInt(answers.itemQuantity)
            var purchaseTotal = parseFloat(answers.itemQuantity*data[0].price)
            console.log('NEW QUANTITY: ' + newQuantity);
            for (var i = 0; i < data.length; i++) {
            console.log('Item ID: ' + data[i].item_id + "|" + 'Product Name: ' + data[i].product_name + " | " + 'Department: ' + data[i].department_name + " | " + 'Price: $' + data[i].price + " | " + 'Quantity in Stock: ' + data[i].stock + '\n' );}
            if (data[0].stock >= answers.itemQuantity){
                //console.log('NEW QUANTITY2: ' + newQuantity);
                //console.log('Item ID '+ answers.itemID);
                connection.query("UPDATE products SET ? WHERE ?", [{stock: newQuantity}, {item_id: answers.itemID}], function(err, res) {
                    console.log('The total cost of your purchase is: $' + purchaseTotal);
                });
            }
            else{
                console.log('Bamazon regrets to inform you we are unable to complete your order');
            }
        });
});
}
//connection.end();