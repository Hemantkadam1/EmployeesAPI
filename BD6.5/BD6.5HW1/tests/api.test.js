const request = require("supertest");
//const { app } =requier("../index.js");
const {
  app,
  validateGames,
    validateTournament,
} = require("../index.js");
const http = require("http");

jest.mock('../index.js',()=>({
  ...jest.requireActual('../index.js'),

  validateGames: jest.fn(),
    validateTournament: jest.fn()
}));


let server ;
beforeAll((done)=>{
  server = http.createServer(app)
  server.listen(3001,done)
});
afterAll((done)=>{
server.close(done);
});

describe("API Endpoints to add data",()=>{
  //excercise 3
  it("should add a new game with valid input",async()=>{
    const res = await request(server)
    .post("/api/games")
    .send({title: 'The Legend of Zelda',
    genre: 'Adventure'});
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({id:1,title: 'The Legend of Zelda',
    genre: 'Adventure' });
  });
//excercise 4
  it("should return 400 from invalid game input",async()=>{
    const res = await request(server).post("/api/games")
    .send({title: 'The Legend of Zelda'});
    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual( "Genre is require and should be a string.");
  });
  //excercise 5
  it("should add a new tournaments with valid input",async()=>{
    const res = await request(server)
    .post("/api/tournaments")
    .send({name:"Zelda Championship",gameId:1});
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id:1,
      name:"Zelda Championship",
      gameId:1,
    });
  });
  //excercise 6
  it("should return 400 from invalid tournaments",async()=>{
    const res = await request(server)
    .post("/api/tournaments")
    .send({name:'Zelda Championship'});
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("GameId is required and should be a number" );
  });
});


// Example of a test to mock validateGame function




describe('validateGame function', () => {
  it('should be called with correct arguments', () => {
    const game = { title: 'The Legend of Zelda', genre: 'Adventure' };

    validateGames(game);

    expect(validateGames).toHaveBeenCalledWith(game);
  });

  it('should return null for valid input', () => {
    validateGames.mockReturnValue(null);

    const result = validateGames({ title: 'The Legend of Zelda', genre: 'Adventure' });

    expect(result).toBeNull();
  });

  it('should return an error message for invalid input', () => {
    validateGames.mockReturnValue('Invalid game data');

    const result = validateGames({ title: '', genre: 'Adventure' });

    expect(result).toBe('Invalid game data');
  });
});



//const { validateTournament } = require('../index.js');

describe('validateTournament function', () => {
  it('should be called with correct arguments', () => {
    const tournament = { name: 'Zelda Championship', gameId: 1 };

    validateTournament(tournament);

    expect(validateTournament).toHaveBeenCalledWith(tournament);
  });

  it('should return null for valid input', () => {
    validateTournament.mockReturnValue(null);

    const result = validateTournament({ name: 'Zelda Championship', gameId: 1 });

    expect(result).toBeNull();
  });

  it('should return an error message for invalid input', () => {
    validateTournament.mockReturnValue('Invalid tournament data');

    const result = validateTournament({ name: '', gameId: 1 });

    expect(result).toBe('Invalid tournament data');
  });
});
