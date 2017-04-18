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

//-------------QUESTION PROMPTS-------------------

var initialMenu = [
    {
        type:'list',
        name:'menuChoice',
        message:'Please select your activity and Press ENTER',
        choices:['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }  
    ];

//-------------END OF QUESTION PROMPTS-------------------  
//-------------BEGIN CUSTOMER OUTPUT-------------------
function questionOne() {inquirer.prompt(initalMenu).then(function (answers){

})
}
connection.end();