let { app , getMovies , getMoviesById , addMovies } = require("../index.js")
let http = require("http");

jest.mock("../index.js",()=>({
  ...jest.requireActual("../index.js"),
    getMovies: jest.fn(),
    getMoviesById: jest.fn(),
    addMovies: jest.fn()

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
  test("getMovies should return a list of movie",()=>{
    const mockMovies =  [
      { movieId: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
  { movieId: 2, title: 'The Godfather', director: 'Francis Ford Coppola' }
    ]
    getMovies.mockReturnValue(mockMovies)
    let result = getMovies()
    expect(result).toEqual(mockMovies)
    expect(getMovies).toHaveBeenCalled() 
  })
test("getMoviesById should return movie details",()=>{
  const mockMovies =   { movieId: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' };
  getMoviesById.mockReturnValue(mockMovies);
  let result = getMoviesById(1);
  expect(result).toEqual(mockMovies)
  expect(getMoviesById).toHaveBeenCalledWith(1)
});
test("getMoviesById should return undefine if movie id not found",()=>{
  getMoviesById.mockReturnValue(undefined);
  
  let result = getMoviesById(999);
  expect(result).toBeUndefined();
  expect(getMoviesById).toHaveBeenCalledWith(999);
})
test("addMovies should add a new movie",()=>{
  const newMovie ={
    movieId: 4,
    title: 'Inception',
    director: 'Christopher Nolan'
  };
  addMovies.mockReturnValue(newMovie);
  let result = addMovies(newMovie);
  expect(result).toEqual(newMovie)
  expect(addMovies).toHaveBeenCalledWith(newMovie);
});
});