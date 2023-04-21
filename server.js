const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "company_db",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Welcome to Gellos Capital Employee Tracker");
  displayMenu();
});

const displayMenu = () => {
  inquirer
    .prompt({
      message: "What would you like to do?",
      name: "menu",
      type: "list",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "Exit",
      ],
    })
    .then((response) => {
      switch (response.menu) {
        case "View all departments":
          displayDepartments();
          break;
        case "View all roles":
          displayRoles();
          break;
        case "View all employees":
          displayEmployees();
          break;
        case "Add a department":
          createDepartment();
          break;
        case "Add a role":
          createRole();
          break;
        case "Add an employee":
          createEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
      }
    });
};

const displayDepartments = () => {
  connection.query("SELECT * FROM department", (error, results) => {
    if (error) throw error;
    console.table(results);
    displayMenu();
  });
};

const displayRoles = () => {
  connection.query("SELECT * FROM job", (error, results) => {
    if (error) throw error;
    console.table(results);
    displayMenu();
  });
};

const displayEmployees = () => {
  connection.query(
    "SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN job ON department.id = job.department_id) JOIN employee ON job.id = employee.job_id);",
    (error, results) => {
      if (error) throw error;
      console.table(results);
      displayMenu();
    }
  );
};

const createDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department name?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department (dept_name) VALUES (?)",
        [answer.department],
        (error, results) => {
          if (error) throw error;
          console.log("Department added!");
          displayMenu();
        }
      );
    });
};

const createRole = () => {
  inquirer
    .prompt([
      {
        name: "jobTitle",
        type: "input",
        message: "What is the role title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
      {
        name: "deptId",
        type: "input",
        message: "What is the department ID number?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO job (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.jobTitle, answer.salary, answer.deptId],
        (error, results) => {
          if (error) throw error;
          console.log("Role added!");
          displayMenu();
        }
      );
    });
};

const createEmployee = () => {
  inquirer.prompt([
      {
        name: 'nameFirst',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'nameLast',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'jobId',
        type: 'input',
        message: "What is the employee's job id?",
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'What is the manager Id?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.nameFirst, answer.nameLast, answer.jobId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log('Employee added!');
          displayMenu();
        }
      );
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter employee id',
      },
      {
        name: 'jobId',
        type: 'input',
        message: 'Enter new job id',
      },
    ])
    .then(answer => {
      connection.query(
        'UPDATE employee SET job_id=? WHERE id=?',
        [answer.jobId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log('Employee updated!');
          displayMenu();
        }
      );
    });
};
