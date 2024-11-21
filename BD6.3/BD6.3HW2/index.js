const express = require('express');
const app = express();
app.use(express.json());

let employees = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', department: 'Marketing' }
];



async function getEmployees() {
  return employees;
}

async function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

async function addEmployee(employee) {
  employee.id = employees.length + 1;
  employees.push(employee);
  return employee;
}



app.get('/employees', async (req, res) => {
  let result = await getEmployees();
  res.json(result);
});

app.get('/employees/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getEmployeeById(id);
  if (!result) {
    return res.status(404).json('Data not found!');
  }
  res.json(result);
});

app.post('/employees/new', async (req, res) => {
  let result = await addEmployee(req.body);
  res.status(201).json(result);
});


module.exports = {
  app,
  getEmployees,
  getEmployeeById,
  addEmployee,
  
};
