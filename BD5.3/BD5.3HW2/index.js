let express = require("express");
let {emp} = require("./models/emp.model");
let {sequelize} = require("./lib/index");
const {parse} = require("querystring");
let app = express();
app.use(express.json());
let Data = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Manager',
    department: 'Sales',
    salary: 90000,
  },
  {
    id: 2,
    name: 'Anna Brown',
    designation: 'Developer',
    department: 'Engineering',
    salary: 80000,
  },
  {
    id: 3,
    name: 'James Smith',
    designation: 'Designer',
    department: 'Marketing',
    salary: 70000,
  },
  {
    id: 4,
    name: 'Emily Davis',
    designation: 'HR Specialist',
    department: 'Human Resources',
    salary: 60000,
  },
  {
    id: 5,
    name: 'Michael Wilson',
    designation: 'Developer',
    department: 'Engineering',
    salary: 85000,
  },
  {
    id: 6,
    name: 'Sarah Johnson',
    designation: 'Data Analyst',
    department: 'Data Science',
    salary: 75000,
  },
  {
    id: 7,
    name: 'David Lee',
    designation: 'QA Engineer',
    department: 'Quality Assurance',
    salary: 70000,
  },
  {
    id: 8,
    name: 'Linda Martinez',
    designation: 'Office Manager',
    department: 'Administration',
    salary: 50000,
  },
  {
    id: 9,
    name: 'Robert Hernandez',
    designation: 'Product Manager',
    department: 'Product',
    salary: 95000,
  },
  {
    id: 10,
    name: 'Karen Clark',
    designation: 'Sales Associate',
    department: 'Sales',
    salary: 55000,
  },
];

app.get("/seed_db",async(req,res)=>{
  try{
await sequelize.sync({force:true});
await emp.bulkCreate(Data);
res.status(200).json({message:"Database seeding successful"});
  }catch(error){
    res.status(500).json({message:"Error seeding the data",error:error.message});
  }
});

//Exercise 1: Fetch all employees
async function fetchAllPosts()
{
  let emps = await emp.findAll();
  return {emp:emps};
}

app.get("/employees",async(req,res)=>{
  try{

  let result = await fetchAllPosts();
  if(result.emp.message === 0)
  { 
    return res.status(404).json({message:"not found"});
}
return res.status(200).json(result);

  }catch(error)
  {
    return res.status(500).json({error:error.message});
  }
})
//Exercise 2: Add a new Employee in the database
async function addNewEmployee(empData)
{
  let newEmp = await emp.create(empData);
  return {newEmp};
}
app.post("/employees/new",async(req,res)=>{
try{
let newEmployee = req.body.newEmployee ;
let response = await addNewEmployee(newEmployee);
return res.status(200).json(response);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
});
//Exercise 3: Update employee information
async function updateEmployeeById(updatedEmpData,id)
{
  let empDetails = await emp.findOne({where:{id}});
  if(!empDetails)
  {
    return {}
  }
  empDetails.set(updatedEmpData)
  let updatedEmp = await empDetails.save();
  return {message:"Employee updated successfully",updatedEmp};
}
app.post("/employees/update/:id",async(req,res)=>{
  try{
    let newEmployeeData =req.body.newEmployeeData;
    let id = parseInt(req.params.id);
    let response = await updateEmployeeById (newEmployeeData,id);
    if(!response.message)
    {
      return res.status(404).json({message:"Employee not found"});
    }
    return res.status(200).json(response);
    }catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});
//Exercise 4: Delete a employee from the database
async function deleteEmployeeById(id)
{
  let destroyedEmp = await emp.destroy({where:{id}});
  if(destroyedEmp === 0)return{}
  return {message:"Employee record deleted"};

}
app.post("/employees/delete",async(req,res)=>{
  try{
let id = parseInt(req.body.id)
let response = await deleteEmployeeById(id);
if(!response.message)
{
  return res.status(404).json({message:"Employee not found"});
}
return res.status(200).json(response);
  }catch(error)
  {
    res.status(500).json({error:error.message});
  }
})
app.listen(3000,()=>{
  console.log("Server is running on port 3000");
})