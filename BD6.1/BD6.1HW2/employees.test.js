let { getEmployees , getEmployeeById , addEmployee}=  require("./employee");

describe('Employees Function',()=>{
  it('should get all employees',()=>{
    let employees = getEmployees();
    expect(employees.length).toBe(4);
    expect(employees).toEqual([
      { id: 1, name: 'John Doe', position: 'Software Engineer' },
      { id: 2, name: 'Jane Smith', position: 'Product Manager' },
      { id: 3, name: 'Sam Johnson', position: 'Designer' },
      { id: 4, name: 'Lisa Brown', position: 'DevOps Engineer' }
    ]);
  });
  it('should return a employee by id',()=>{
    let employee = getEmployeeById(1);
    expect(employee).toEqual({ id: 1, name: 'John Doe', position: 'Software Engineer' })
  });
  it('should return undefined for a non-existant employee',()=>{
    let employee =getEmployeeById(97);
    expect(employee).toBeUndefined();
  });
  it('should add a new employee',()=>{
    let newEmployee ={name:"New Employee" , position:"Position"};
    let addedEmployee = addEmployee(newEmployee);
    expect(addedEmployee).toEqual({
      id:5,
      name:'New Employee',
      position:'Position',
    });
    const employees = getEmployees();
    expect(employees.length).toBe(5);
  });
});