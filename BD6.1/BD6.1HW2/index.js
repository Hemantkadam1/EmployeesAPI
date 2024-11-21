let {getEmployees , getEmployeeById , addEmployee} =require("./employee");
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());


app.get("/api/employees",(req,res)=>{
  res.json(getEmployees());
});

app.get("/api/employees/:id",(req,res)=>{
  const employee = getEmployeeById(parseInt(req.params.id));
  if(!employee) return res.status(404).send("Employee not found");
  res.json(employee);
});

app.post("/api/employees",(req,res)=>{
  const employee = addEmployee(req.body);
  res.status(201).json(employee);

});
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;