let express = require("express");
let { sequelize } = require("./lib/index");
let { department } = require("./models/department.model");
let {employee} = require("./models/employee.model");
let { role } = require("./models/role.model");
let { employeeDepartment } = require("./models/employeeDepartment.model");
let { employeeRole } = require("./models/employeeRole.model");
let { Op } =require("@sequelize/core");
let app = express();
app.use(express.json());

// Endpoint to seed database
app.get('/seed_db', async (req, res) => {
  await sequelize.sync({ force: true });

  const departments = await department.bulkCreate([
    { name: 'Engineering' },
    { name: 'Marketing' },
  ]);

  const roles = await role.bulkCreate([
    { title: 'Software Engineer' },
    { title: 'Marketing Specialist' },
    { title: 'Product Manager' },
  ]);

  const employees = await employee.bulkCreate([
    { name: 'Rahul Sharma', email: 'rahul.sharma@example.com' },
    { name: 'Priya Singh', email: 'priya.singh@example.com' },
    { name: 'Ankit Verma', email: 'ankit.verma@example.com' },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await employeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await employeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await employeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await employeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  return res.json({ message: 'Database seeded!' });
});



// Helper function to get employee's associated departments
async function getEmployeeDepartments(employeeId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { employeeId },
  });

  let departmentData;
  for (let empDep of employeeDepartments) {
    departmentData = await department.findOne({
      where: { id: empDep.departmentId },
    });
  }

  return departmentData;
}

// Helper function to get employee details with associated departments and roles
async function getEmployeeDetails(employeeData) {
  const department = await getEmployeeDepartments(employeeData.id);
  const role = await getEmployeeRoles(employeeData.id);

  return {
    ...employeeData.dataValues,
    department,
    role,
  };
}


// Helper function to get employee's associated roles
async function getEmployeeRoles(employeeId) {
  const employeeRoles = await employeeRole.findAll({
    where: { employeeId },
  });

  let roleData;
  for (let empRole of employeeRoles) {
    roleData = await role.findOne({
      where: { id: empRole.roleId },
    });
  }

  return roleData;
}



async function getAllEmployees() {
  let employees = await employee.findAll();

  const detailedEmployee = [];

  // Loop through each employee and fetch additional details
  for (const employee of employees) {
    let empDetails = await getEmployeeDetails(employee);
    detailedEmployee.push(empDetails);
  }
  return { detailedEmployee };
}

// Endpoint to fetch all employees
app.get('/employees', async (req, res) => {

  try {
    let response = await getAllEmployees();

    if (response.detailedEmployee.length === 0) {
      return res.status(404).json({ message: 'No tickets  found' });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }


});
//Exercise 2: Get Employee by ID
async function getEmployeeById(employeeId)
{
  const employees = await employee.findOne({
    where:{id:employeeId},
  });
  const detailedEmployee2 = [];
  const employeeDetails = await getEmployeeDetails(employees);
  return {detailedEmployee2:[employeeDetails]};
}

app.get("/employees/details/:id",async(req,res)=>{
  try {
    const employeeId = parseInt(req.params.id); // Consistent naming
    const response = await getEmployeeById(employeeId);

    // Check if the employee was found
    if (!response || response.detailedEmployee2.length === 0) {
      return res.status(404).json({ message: 'Ticket not found by ID' });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 3: Get Employees by Department
async function getEmployeesByDepartment(departmentId) {
  let empDepRecord = await employeeDepartment.findAll({
    where: { departmentId },
  });

  if (empDepRecord.length == 0) return {};

  let empRecords = [];

  for (let empDepData of empDepRecord) {
    empRecords.push(
      await employee.findOne({
        where: { id: empDepData.employeeId },
      }),
    );
  }

  let employees = [];

  for (let emp of empRecords) {
    employees.push(await getEmployeeDetails(emp));
  }

  return { employees };
}

app.get("/employees/department/:departmentId", async (req, res) => {
  try {
    let departmentId = parseInt(req.params.departmentId);
    let response = await getEmployeesByDepartment(departmentId);

    if (!response.employees) {
      return res.status(404).json({
        message: "No employees found for department id " + departmentId,
      });
    }

    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

});
//Exercise 4: Get All Employees by Role
async function getAllEmployeeByRole(roleId)
{
  let empRolRecord = await employeeRole.findAll({where:{roleId}});
  if(empRolRecord.length == 0) return{};
  let empRecords= [];
  for(let emprolData of empRolRecord){
    empRecords.push(await employee.findOne({where:{id:emprolData.employeeId}}));
  }
  let employees = [] ;
  for(let emp of empRecords)
  {
    employees.push(await getEmployeeDetails(emp));
  }
  return{employees};
}
app.get("/employees/role/:roleId",async(req,res)=>{
  try{
    let roleId = parseInt(req.params.roleId);
    let response = await getAllEmployeeByRole(roleId);
    if(!response.employees){
    return res.status(404).json({message:"No employees found for role id "+roleId});
    }
    res.status(200).json(response);
  }catch(error)
  {
return res.status(500).json({error:error.message});
  }
});
//Exercise 5: Get Employees Sorted by Name
async function getEmployeesSortedByName()
{
  const employees = await employee.findAll({
    order:[['name','ASC']],
  });
  const detailedEmployees = [];
  for(const emp of employees )
  {
    const empDetails = await getEmployeeDetails(emp);
    detailedEmployees.push(empDetails);
  } 
  return detailedEmployees;
}
app.get("/employees/sort-by-name",async(req,res)=>{
  try{
    const response = await getEmployeesSortedByName();
    if(response.length ===0){
    return res.status(404).json({message:"no employees founds"});
    }
    return res.status(200).json(response);
  }catch(error)
  {
    return res.status(500).json({error:error.message});
  }

});
//Exercise 6: Add a New Employee
async function addNewEmployee(employeeData)
{
  const newEmployee = await employee.create(employeeData);
  return newEmployee;
}
app.post("/employees/new",async(req,res)=>{
  try{
    const employeeData = req.body;
    if(!employeeData.name || !employeeData.email || !employeeData.departmentId || !employeeData.roleId)
    {
      return res.status(404).json({message:"name and email and department id roleId require"});
    }
const newEmployee = await addNewEmployee(employeeData)
    // Return a success response with the created employee
      return res.status(200).json(newEmployee);
  }catch(error)
  {
    return res.status(500).json({error:error.message})
  }
});
// Exercise 7: Update Employee Details
async function updateEmployeeDetails(employeeId,employeeData)
{
  const employees = await employee.findOne({where:{id:employeeId}});
  if(!employees) return {};
  const updatedEmployee = await employees.update(employeeData);
  return updatedEmployee;
}
app.post("/employees/update/:id",async(req,res)=>{
  try{
    const employeeId = parseInt(req.params.id);
    const employeeData = req.body;
    if(!employeeData.email)
    {
      return res.status(404).json({message:"name and email and department id roleId require"});
    }
    const updatedEmployee = await updateEmployeeDetails(employeeId,employeeData);
    if(!updatedEmployee)
    {
      return res.status(404).json({message:"employee not found"});

    }
    return res.status(200).json(updatedEmployee);

  }catch(error)
  {
    return res.status(500).json({error:error.message});
  }

})


//Exercise 8: Delete an Employee
async function deleteEmployee(employeeId)
{
  const employees = await employee.findOne({where:{id:employeeId}});
  if(!employees) return {};
  const deletedEmployee = await employees.destroy();
  return {deletedEmployee};
}
app.post("/employees/delete",async(req,res)=>{
  try{
    const employeeId = parseInt(req.body.id);
    const deletedEmployee = await deleteEmployee(employeeId);
    if(!deletedEmployee)
    {
      return res.status(404).json({message:"employee not found"});
    }
    return res.status(200).json(deletedEmployee);
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
