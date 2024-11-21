const request = require("supertest");
const{
  app,
  validateAuthor,
  validateArticle,
} = require("../index.js");
const http = require("http");


jest.mock("../index.js",()=>({
  ...jest.requireActual("../index.js"),
  validateAuthor: jest.fn(),
  validateArticle: jest.fn(),

}));

let server;
beforeAll((done)=>{
  server = http.createServer(app)
  server.listen(3001,done);
});
describe("Api Endpoints to add data",()=>{
  //Exercise 3: Test Add a New Article with Valid Input
  it("should add a  new article with valid input",async()=>{
    const res = await request(server)
    .post("/api/articles")
    .send({title: 'Understanding JavaScript',
    content: 'JavaScript is a versatile language used for both frontend and backend development.',
  });
  expect(res.statusCode).toEqual(201);
  expect(res.body).toEqual({
    id:3,
    title: 'Understanding JavaScript',
    content: 'JavaScript is a versatile language used for both frontend and backend development.'
  });
  });
//Exercise 4: Test Add a New Article with Invalid Input
  it("should return 400 from invalid input",async()=>{
    const res = await request(server).post("/api/articles")
    .send({title: 'Understanding JavaScript'});
    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual("Content is require and should be a string");
  });

//Exercise 5: Test Add a New Author with Valid Input
it("should add a new authors with valid input",async()=>{
  const res = await request(server)
  .post("/api/authors")
  .send({name: 'John Doe',
    articleId: 1});
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({id: 3,
      name: 'John Doe',
      articleId: 1})
});
//Exercise 6: Test Add a New Author with Invalid Input
it("should return 400 from invalid inputs authors",async()=>{
  const res = await request(server)
  .post("/api/authors")
  .send({name: 'John Doe'});
  expect(res.statusCode).toEqual(400);
  expect(res.text).toEqual("articleId is required and should be a number");
});
});

// Example of a test to mock validateGame function


describe('validate function with jest and mocks ', () => {
  it('should be called with correct arguments', () => {
    const article = {  title: 'Understanding JavaScript',
    content: 'JavaScript is a versatile language used for both frontend and backend development.' };

    validateArticle(article);

    expect(validateArticle).toHaveBeenCalledWith(article);
  
  });

  it('should return null for valid input', () => {
    validateArticle.mockReturnValue(null);

    const result = validateArticle({ title: 'Understanding JavaScript',
    content: 'JavaScript is a versatile language used for both frontend and backend development.'  });

    expect(result).toBeNull();
  });
});



describe('validateArticle function', () => {
  it('should call validateArticle with correct arguments', () => {
    let validateArticleMock = jest.fn(validateArticle);
    const title = 'Mastering Node.js';
    const content = 'Node.js is a powerful tool for backend development...';

    validateArticleMock(title, content);

    expect(validateArticleMock).toHaveBeenCalledWith(title, content);
    expect(validateArticleMock).toReturnWith(null); // no validation error for valid input
  });
});

describe('validateArticle function', () => {
  it('should return error message for invalid input', () => {
  validateArticle.mockReturnValue("Title is require and should be a string");
  const result = validateArticle({title: '',
  content: 'JavaScript is a versatile language used for both frontend and backend development.'});
  expect(result).toBe("Title is require and should be a string");
  });
});

describe('validateAuthor function', () => {
  it('should call validateAuthor with correct arguments', () => {
    validateAuthor.mockReturnValue(null);
    const result = validateAuthor({name: 'John Doe',
    articleId: 1});
    expect(result).toBeNull();
    
  });
});

describe('validateAuthor function', () => {
  it('should return error message for invalid input', () => {
    validateAuthor.mockReturnValue("Name is require and should be a string");
    const result = validateAuthor({name: '',
    articleId: 1});
    expect(result).toBe("Name is require and should be a string");
  });
});