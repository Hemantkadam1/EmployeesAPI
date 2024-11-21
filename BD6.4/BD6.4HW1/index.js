let{ getEmployee ,getEmployeeById ,getDepartments, getDepartmentById } = require("./employee");
let express = require("express");
let app = express();
app.use(express.json());

//Endpoint 1 find all employee
app.get("/employees",async(req,res)=>{
  const emp  = await getEmployee();
  try{
  if(emp.length === 0)
  {
    return res.status(404).json({error:"employee not found"});
  }
  return res.json(emp)
}catch(error)
{
  res.status(500).json({error:"Internal server error"});
}
});
//endpoint 2 find all employee by ID
app.get("/employee/:id",async(req,res)=>{
  try{
  let id= parseInt(req.params.id);
  let employee =await getEmployeeById(id);
  if(!employee)
  {
    return res.status(404).json({error:"employee not found"});
  }
  return res.json(employee);
}
catch(error)
{
  return res.status(500).json({error:"Internal server error "});
}
});

//endpoint 3 get all departments 
app.get("/departments",async(req,res)=>{
  try{
  const dep = await getDepartments();
if(dep.length === 0)
{
  return res.status(404).json({error:"department not found"});
}  
return res.json(dep);
}catch(error)
{
  return res.status(500).json({error:"Internal server error"});
}
});
// endpoint 4 Exercise 4: Get Department by ID
app.get("/departments/:id",async(req,res)=>{
  try{
  let id = parseInt(req.params.id);
  const dep = await getDepartmentById(id);
  if(!dep)
  {
    return res.status(404).json({error:"department not found"});
  }
  return res.json(dep);
}catch(error)
{
return res.status(500).json({error:"Internal server error"});
}
});

module.exports = {app};