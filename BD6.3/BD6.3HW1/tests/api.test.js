let {
  app,
  getGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
} = require('../index.js');

let request = require('supertest');
let http = require('http');
const { beforeEach } = require('node:test');

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getGames: jest.fn(),
  getGameById: jest.fn(),
  addGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addDeveloper: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('endpoints testing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should get the list of games', async () => {
    let mockGames = [
      {
        id: 1,
        title: 'The Legend of Zelda',
        genre: 'Adventure',
        developer: 'Nintendo',
      },
      {
        id: 2,
        title: 'Super Mario Bros',
        genre: 'Platformer',
        developer: 'Nintendo',
      },
    ];

    getGames.mockResolvedValue(mockGames);
    let result = await request(server).get('/games');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGames);
  });

  it('should Test get game by ID', async () => {
    let mockGame = {
      id: 1,
      title: 'The Legend of Zelda',
      genre: 'Adventure',
      developer: 'Nintendo',
    };

    getGameById.mockResolvedValue(mockGame);
    let result = await request(server).get('/games/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGame);
  });

  it('should Test get games by non-existent ID', async () => {
    getGameById.mockResolvedValue(null);
    let result = await request(server).get('/games/details/99');
    expect(result.statusCode).toEqual(404);
  });

  it('should Test add new game', async () => {
    let newGames = {
      id: 3,
      title: 'new game',
      genre: 'funny',
      developer: 'Kashimo',
    };

    addGame.mockResolvedValue(newGames);
    let result = await request(server)
      .post('/games/new')
      .send({ title: 'new game', genre: 'funny', developer: 'Kashimo' });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(newGames);
  });

  it('should Test get developer by ID', async () => {
    let mockDeveloper = { id: 1, name: 'Nintendo', country: 'Japan' };

    getDeveloperById.mockResolvedValue(mockDeveloper);
    let result = await request(server).get('/developers/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockDeveloper);
  });

  it('should Test get user by non-existent ID', async () => {
    getDeveloperById.mockResolvedValue(null);
    let result = await request(server).get('/developers/details/99');
    expect(result.statusCode).toEqual(404);
  });

  it('should Test add new developer', async () => {
    let newDeveloper = { id: 2, name: 'new dev', country: 'ohio' };

    addDeveloper.mockResolvedValue(newDeveloper);
    let result = await request(server)
      .post('/developers/new')
      .send({ name: 'new dev', country: 'ohio' });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(newDeveloper);
  });
});
