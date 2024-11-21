const request = require("supertest");
const {app} = require("../index.js");
const {
  getEmployee ,
  getEmployeeById ,
  getDepartments, 
  getDepartmentById,
} = require("../employee.js");
const http = require("http");

jest.mock("../employee.js",()=>({
  ...jest.requireActual('../employee.js'),
  getEmployee: jest.fn(),
  getEmployeeById: jest.fn(),
  getDepartments:jest.fn(),
  getDepartmentById:jest.fn(),
}));
let server;
beforeAll((done)=>{
  server = http.createServer(app);
  server.listen(3001, done);
});
afterAll((done)=>{
  server.close(done);
});
describe("API Error Handling Test",()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });
  it("Get Api /employees should return 404 if no employees are found",async()=>{
    getEmployee.mockReturnValue([]);
    const response = await request(server).get("/employees");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("employee not found");
  });

  
  it("Get API /employee/:id should return 404 if no employees are found by id",async ()=>{
getEmployeeById.mockReturnValue(null);
const response = await request(server).get("/employee/898");
expect(response.status).toEqual(404);
expect(response.body.error).toBe("employee not found");
  });
  
  it("GET API /api/departments should return 404 if no department are found",async()=>{
    getDepartments.mockReturnValue([])
    const response = await request(server).get("/departments");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("department not found");
  });
  
  it("GET API /api/departments should return 404 for non-existing review",async()=>{
    getDepartmentById.mockReturnValue(null)
    const response = await request(server).get("/departments/808");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("department not found")
  });
  


});