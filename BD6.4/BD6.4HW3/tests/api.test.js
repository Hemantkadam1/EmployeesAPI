const request = require("supertest");
const{ app } = require("../index.js");
const{
  getAllArticles ,
   getArticleById, 
   getAllComments , 
   getCommentsById , 
   getUserById ,
}= require("../articles.js");
const http = require("http");

jest.mock("../articles.js",()=>({
  ...jest.requireActual("../articles.js"),
  getAllArticles: jest.fn() ,
   getArticleById : jest.fn(), 
   getAllComments :jest.fn(), 
   getCommentsById: jest.fn() , 
   getUserById : jest.fn(), 
}));
let server;
beforeAll((done)=>{
  server = http.createServer(app);
  server.listen(3001,done);
});
afterAll((done)=>{
  server.close(done);
});
describe("API Error Handling Test",()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });
  it("GET Api /articles should return 404 if no article are found",async()=>{
    getAllArticles.mockReturnValue([]);
    const response = await request(server).get("/articles");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("not found articles");
  });
  it("GET API /articles/:id should return 404 if no article are found by id",async()=>{
    getArticleById.mockReturnValue(null);
    const response = await request(server).get("/articles/:id");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("article not found");
  });
  it("GET API /comments should  return 404 if no comments are found ",async()=>{
    getAllComments.mockReturnValue([]);
    const response = await request(server).get("/comments");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("no comment found");
  });
  it("GET API /commentById should return 404 if no comments are found",async()=>{
    getCommentsById.mockReturnValue(null);
    const response = await request(server).get("/comments/:id");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("no comment found");
  });
  it("GET API /userById should return 404 if no user are found",async()=>{
    getUserById.mockReturnValue([]);
    const response = await request(server).get("/users/:id");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("not found user");
  });
});