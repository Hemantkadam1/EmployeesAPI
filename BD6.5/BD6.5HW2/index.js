const express = require("express");
const app = express();
app.use(express.json());

let employees =[];
let companies = [];

function validateEmployee(emp)
{
  if(!emp.name|| typeof emp.name !=="string"){
    return "Name is require and should be a string";
  }
  if(!emp.companyId || typeof emp.companyId !=="number"){
    return "companyId is require and should be number";
  }
  return null;
}
app.post("/api/employees",(req,res)=>{
  let error = validateEmployee(req.body)
  if(error) return res.status(400).send(error)
  
  let employee = {id:employees.length +1, ...req.body};
  employees.push(employee);
  res.status(201).json(employee);
});

function validateComp(comp)
{
  if(!comp.name || typeof comp.name !== "string"){
    return "Name is required and should be a string"
  }

  return null;
}
app.post("/api/companies",(req,res)=>{
  let error = validateComp(req.body);
  if(error) return res.status(400).send(error);
  let comp = {id:companies.length+1 , ...req.body};
  companies.push(comp);
  res.status(201).json(comp);
});

module.exports = {app ,validateEmployee ,validateComp };