const request = require("supertest");
const { app } = require("../index.js");
const {
  getGames ,
   getGameById ,
    getAllGenres ,
     getGenreById,
}= require("../game.js");
const http =require("http");

jest.mock("../game.js",()=>({
  ...jest.requireActual("../game.js"),
  getGames: jest.fn() ,
  getGameById: jest.fn(),
   getAllGenres : jest.fn(),
    getGenreById : jest.fn(),
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
 it("Get Api /games should return 404 if no game are found",async()=>{
   getGames.mockReturnValue([]);
   const response = await request(server).get("/games");
   expect(response.status).toEqual(404);
   expect(response.body.error).toBe("No games found");
 });
 it("GET API /games/:id should return 404 if no games are found by id",async()=>{
   getGameById.mockReturnValue(null);
   const response = await request(server).get("/games/:id");
   expect(response.status).toEqual(404);
   expect(response.body.error).toBe("Game not found");
 });
 it("GET APi /genres should return 404 if no genres are found ",async()=>{
  getAllGenres.mockReturnValue([]);
   const response = await request(server).get("/genres");
   expect(response.status).toBe(404);
   expect(response.body.error).toBe("not found any genres");
 });
 it("GET API /genres:id should return 404 if no genres are found by id",async()=>{
  getGenreById.mockReturnValue(null)
  const response = await request(server).get("/genres/:id");
  expect(response.status).toBe(404);
  expect(response.body.error).toBe("no genres is found");
 });
});
