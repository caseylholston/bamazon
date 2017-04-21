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
    console.log('You are now connected to Bamazon');
});

//-------------QUESTION PROMPTS-------------------

var initialMenu = [
    {
        type:'list',
        name:'menuChoice',
        message:'Please select your activity and Press ENTER',
        choices:['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }  
    ];

    var addInventoryMenu = [
    {
        type:'input',
        name:'itemID',
        message:"What product's inventory would you like to update? -- Please type the Item ID and Press ENTER",
    },
    {
        type:'input',
        name:'itemQuantity',
        message:"How many items would you like to add to the inventory? -- Please type a number and Press ENTER",
    },
    ];
    
    var addProductMenu = [
    {
        type:'input',
        name:'product_name',
        message:"What is the name of your product -- Please type the Product Name and Press ENTER",
    },
    {
        type:'input',
        name:'department_name',
        message:"What department is the product in? -- Please type the Department Name and Press ENTER",
    },
    {
        type:'input',
        name:'price',
        message:"What is the price of the product? -- Please type the Price and Press ENTER",
    },
    {
        type:'input',
        name:'stock',
        message:"How many of this product would you like to add to Inventory? -- Please type the number of items in whole numbers and Press ENTER",
    },
    ];

//-------------END OF QUESTION PROMPTS-------------------  
//-------------BEGIN CUSTOMER OUTPUT-------------------
 inquirer.prompt(initialMenu).then(function (answers){
    switch (answers.menuChoice) {
        case 'View Products for Sale':
        viewProduct();
        connection.end();
        break;

        case 'View Low Inventory':
        viewLowInventory();
        connection.end();
        break;

        case 'Add to Inventory':
        addInventory();
        //connection.end();
        break;

        case 'Add New Product':
        addProduct();
        //connection.end();
        break;
    }
});

//----------------------MANAGER FUNCTIONS-----------------------------
function viewProduct(){
    connection.query('SELECT * FROM products', function (err, res){
    for (var i = 0; i < res.length; i++) {
    console.log('Item ID: ' + res[i].item_id + "|" + 'Product Name: ' + res[i].product_name + " | " + 'Department: ' + res[i].department_name + " | " + 'Price: $' + res[i].price + " | " + 'Quantity in Stock: ' + res[i].stock + '\n' );
    };
    console.log('---------------------------------------');
})
}

function viewLowInventory(){
    connection.query('SELECT * FROM products WHERE stock < 5', function (err, res){
    for (var i = 0; i < res.length; i++) {
    console.log('Item ID: ' + res[i].item_id + "|" + 'Product Name: ' + res[i].product_name + " | " + 'Department: ' + res[i].department_name + " | " + 'Price: $' + res[i].price + " | " + 'Quantity in Stock: ' + res[i].stock + '\n' );
    };
    console.log('---------------------------------------');
})
};

function addInventory(){
    connection.query('SELECT * FROM products', function (err, res){
    for (var i = 0; i < res.length; i++) {
    console.log('Item ID: ' + res[i].item_id + "|" + 'Product Name: ' + res[i].product_name + " | " + 'Department: ' + res[i].department_name + " | " + 'Price: $' + res[i].price + " | " + 'Quantity in Stock: ' + res[i].stock + '\n' );
    };
    console.log('---------------------------------------');
        inquirer.prompt(addInventoryMenu).then(function (answers){
                connection.query('SELECT * FROM products WHERE item_id=?', [answers.itemID], function(err, res1) {
                console.log('Item ID Results: '+ res1);
                if(isNaN(answers.itemQuantity)===false){
                var newQuantity = parseInt(res1[0].stock) + parseInt(answers.itemQuantity);
                //console.log('New Quantity: ' + newQuantity);
                    connection.query('Update products SET ? WHERE ?', [{stock: newQuantity}, {item_id: answers.itemID}], function (err, res){
                    for (var i = 0; i < res1.length; i++) {
                    console.log('Item ID: ' + res1[i].item_id + "|" + 'Product Name: ' + res1[i].product_name + " | " + 'Department: ' + res1[i].department_name + " | " + 'Price: $' + res1[i].price + " | " + 'New Quantity in Stock: ' + newQuantity + '\n' );
                    };
                    console.log('---------------------------------------');
                })
                }
                });
        });
    })
};     

function addProduct(){
    inquirer.prompt(addProductMenu).then(function (answers){
        var newProduct = {product_name:answers.product_name, 
                 department_name:answers.department_name, 
                 price:parseFloat(answers.price), 
                 stock:parseFloat(answers.stock)
        };
                connection.query('INSERT INTO products SET ?', newProduct, function(err, res){
                    // console.log(res);
                    // console.log('I Ran');
                 })
    })
};
