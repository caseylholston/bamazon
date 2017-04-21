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
        name:'department_name',
        message:"What is the name of the department? -- Please type the Department Name and Press ENTER",
    },
    {
        type:'input',
        name:'overhead_costs',
        message:"What are the overhead costs of the department? -- Please type the costs and Press ENTER",
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
        addDepartment();
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
function addDepartment(){
    inquirer.prompt(addDepartmentMenu).then(function (answers){
        var newDepartment = {department_name:answers.department_name, 
                 over_head_costs:parseFloat(answers.overhead_costs)
        };
                connection.query('INSERT INTO departments SET ?', newDepartment, function(err, res){
                    if (err) throw err;
                    // console.log(res);
                    // console.log('I Ran');
                 })
    })
};

