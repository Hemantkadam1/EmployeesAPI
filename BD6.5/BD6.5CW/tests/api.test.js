const request = require("supertest")
const {app ,validateUser , validateBook ,validateReview} = require("../index.js")
const https = require("http");
let server;

beforeAll((done)=>{
  server = http.createServer(app)
  server.listen(3001,done)
});

afterAll((done)=>{
  server.close(done)
});

describe("API Endpoints to add data",()=>{
  it("should add a new user with valid input",async()=>{
    const res = await request(server).post("/api/users").send({name:"John Doe",email:"Johndoe@email.com"});
    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual({
      id:1,
      name:"John Doe",
      email:"Johndoe@email.com",
    });
  });
  it("should return 400 from invalid user input",async ()=>{
    const res =await request(server).post("/api/users").send({name:"John"})
    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual("Email is require and should be a string");
  })
})