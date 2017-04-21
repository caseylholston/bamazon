var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

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
        choices:['View Product Sales by Department', 'Create New Department']
    }  
    ];
 
    var addDepartmentMenu = [
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
//-------------START SWITCH STATEMENT-------------------  

 inquirer.prompt(initialMenu).then(function (answers){
    switch (answers.menuChoice) {
        case 'View Product Sales by Department':
        viewDepartments();
        connection.end();
        break;

        case 'Create New Department':
        createDepartment();
        //connection.end();
        break;
    }
 });
 //-------------END SWITCH STATEMENT-------------------  

 //-------------START FUNCTIONS-------------------

function viewDepartments(){
    connection.query('SELECT department_id, department_name, over_head_costs, SUM(total_sales - over_head_costs)  AS total_profit FROM departments GROUP BY department_id', function (err, res){
//     for (var i = 0; i < res.length; i++) {
//     console.log('Department ID: ' + res[i].department_id + "|" + 'Department Name: ' + res[i].department_name + " | " + 'Overhead Costs: $' + res[i].over_head_costs + " | " + 'Total Profit ' + res[i].total_profit + '\n' );
// };
    console.table(['Department ID', 'Department Name', 'Overhead Costs', 'Total Profit '], res );
    console.log('---------------------------------------');
})
}

