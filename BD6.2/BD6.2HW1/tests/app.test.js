let { app , getEmployee , getEmployeeById , addEmployee } = require("../index.js")
let http = require("http");

jest.mock("../index.js",()=>({
  ...jest.requireActual("../index.js"),
    getEmployee: jest.fn(),
    getEmployeeById: jest.fn(),
    addEmployee: jest.fn()

}))

let server;

beforeAll((done) =>{
  server = http.createServer(app)
  server.listen(3001, done)
})

afterAll((done) =>{
  server.close(done)
})

describe("Function Tests",()=>{
  beforeEach(()=>{
    jest.clearAllMocks()
  })
  test("getEmployee should return a list of employees",()=>{
    const mockEmployees =  [
      { employeeId: 1, name: 'John Doe', position: 'Software Engineer' },
      { employeeId: 2, name: 'Jane Smith', position: 'Product Manager' }
    ];
    getEmployee.mockReturnValue(mockEmployees)
    let result = getEmployee()
    expect(result).toEqual(mockEmployees)
    expect(getEmployee).toHaveBeenCalled() 
  })
test("getEmployeeById should return employee details",()=>{
  const mockEmployee =  {employeeId: 1, name: 'John Doe', position: 'Software Engineer' };
  getEmployeeById.mockReturnValue(mockEmployee);
  let result = getEmployeeById(1);
  expect(result).toEqual(mockEmployee)
  expect(getEmployeeById).toHaveBeenCalledWith(1)
});
test("getEmployeeById should return undefine if employee id not found",()=>{
  getEmployeeById.mockReturnValue(undefined);
  
  let result = getEmployeeById(999);
  expect(result).toBeUndefined();
  expect(getEmployeeById).toHaveBeenCalledWith(999);
})
test("addEmployee should add a new employee",()=>{
  const newEmployee ={
    employeeId: 4,
  name: 'Alice Johnson',
  position: 'HR Manager'
  };
  addEmployee.mockReturnValue(newEmployee);
  let result = addEmployee(newEmployee);
  expect(result).toEqual(newEmployee)
  expect(addEmployee).toHaveBeenCalledWith(newEmployee);
});
});