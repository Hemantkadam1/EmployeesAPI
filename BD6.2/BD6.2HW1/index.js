const express = require("express");
const app = express();
app.use(express.json());

let employees = [
  { employeeId: 1, name: 'John Doe', position: 'Software Engineer' },
  { employeeId: 2, name: 'Jane Smith', position: 'Product Manager' },
  { employeeId: 3, name: 'Sam Johnson', position: 'Designer' }
];

function getEmployee()
{
  return employees;
}
function getEmployeeById(id)
{
  return employees.find((employee)=> employee.employeeId === id);
}

function addEmployee(employee){
  
  employees.push(employee)
  return employee;
}
app.get("/employees",(req,res)=>{
  res.json(getEmployee());
});
app.get("/employees/details/:id",(req,res)=>{
  let id =parseInt(req.params.id);
  let employee = getEmployeeById(id);
  if(employee){
    res.json(employee);
  }else{
    res.status(404).send("employee not found");
  }
});

app.post("/employee/new",(req,res)=>{
  let employee = req.body;
  let addedemployee = addEmployee(employee);
  res.status(201).json(addedemployee);
})

module.exports = {app, getEmployee , getEmployeeById , addEmployee};