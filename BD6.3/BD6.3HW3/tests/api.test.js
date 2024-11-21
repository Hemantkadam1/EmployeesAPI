let {
  app,
  getRecipes,
  getRecipeById,
  addRecipe,

} = require('../index.js');

let request = require('supertest');
let http = require('http');
const { beforeEach } = require('node:test');

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  addRecipe: jest.fn(),

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
  it('should get the list of recipes', async () => {
    let mockRecipe = [
      { 
         id: 1, 
         name: 'Spaghetti Bolognese', 
         cuisine: 'Italian', 
         difficulty: 'Medium' ,
      },
      { 
          id: 2, 
          name: 'Chicken Tikka Masala', 
          cuisine: 'Indian', 
          difficulty: 'Hard' ,
      }
    ];

    getRecipes.mockResolvedValue(mockRecipe);
    let result = await request(server).get('/recipes');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipe);
  });

  it('should Test get  recipes by ID', async () => {
    let mockRecipe = { 
      id: 1, 
      name: 'Spaghetti Bolognese', 
      cuisine: 'Italian', 
      difficulty: 'Medium' ,
   };

    getRecipeById.mockResolvedValue(mockRecipe);
    let result = await request(server).get('/recipes/details/1');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipe);
  });

  it('should Test get recipes by non-existent ID', async () => {
    getRecipeById.mockResolvedValue(null);
    let result = await request(server).get('/recipes/details/99');
    expect(result.statusCode).toEqual(404);
  });

  it('should Test add new recipes', async () => {
    let newRecipe = {
      id:3,
      name: 'Sushi',
      cuisine: 'Japanese',
      difficulty: 'Hard',
    };

    addRecipe.mockResolvedValue(newRecipe);
    let result = await request(server)
      .post('/recipes/new')
      .send({
        name: 'Sushi',
        cuisine: 'Japanese',
        difficulty: 'Hard',
      });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(newRecipe);
  });

});
