const request = require("supertest")
const{
  app,
  validateEmployee,
  validateComp,

}= require("../index.js");
const http = require("http");

jest.mock("../index.js",()=>({
  ...jest.requireActual("../index.js"),
  validateEmployee: jest.fn(),
  validateComp: jest.fn(),
}));
let server;
beforeAll((done)=>{
  server = http.createServer(app)
  server.listen(3001,done)
});
afterAll((done)=>{
  server.close(done);
});
describe("Api Endpoints to add data",()=>{
  it("should add a new employee with valid inpute",async()=>{
    const res = await request(server)
    .post("/api/employees")
    .send({ name: 'John Doe',
    companyId: 1,
  });
  expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id:1,
      name:"John Doe",
   companyId:1,
    });
  });
  
it("should return 400 from invalid employee input",async()=>{
  const res = await request(server).post("/api/employees")
  .send({name: 'John Doe'})
  expect(res.statusCode).toEqual(400)
  expect(res.text).toEqual("companyId is require and should be number");
});
it("should add a new company with valid input",async()=>{
  const res = await request(server)
  .post("/api/companies")
  .send({name:'TechCorp'})
  expect(res.statusCode).toEqual(201);
  expect(res.body).toEqual({
    id:1,
    name:'TechCorp',
  });
});

it("should add a new company with invalid input",async()=>{
  const res = await request(server)
  .post("/api/companies")
  .send({name:""});
  expect(res.statusCode).toEqual(400);
  expect(res.text).toEqual("Name is required and should be a string");
});
});

describe("jest mocks validate function",()=>{
  it("Test Employee Validation Function with Jest Mocks",()=>
  {
    const employee = { name: 'John Doe',
    companyId: 1  ,
   };
  validateEmployee(employee);
  expect(validateEmployee).toHaveBeenCalledWith(employee);
  });
it("Test Employee Validation Function Error Handling with Jest Mocks",()=>{
  validateEmployee.mockReturnValue("Invalid Employee data");
  const result = validateEmployee({
    id:1,
    name:"",
 companyId:1,
  });
expect(result).toBe("Invalid Employee data");
});
});
describe("validateCompanies function",()=>{
  it("should be called with correct arguments and returns null for valid input.",()=>{
    validateComp.mockReturnValue(null);
    const result = validateComp({name:'TechCorp'});
    expect(result).toBeNull();
  });
  it("Test Company Validation Function Error Handling with Jest Mocks",()=>{
    validateComp.mockReturnValue("Invalid company data");
    const result = validateComp({name:""});
    expect(result).toBe("Invalid company data");
  });
});
