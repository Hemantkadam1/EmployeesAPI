let{getMovies , getMovieById , addMovies} = require("./movies");

describe('movies function',() =>{
  it('should get all Movies',()=>{
    let movies = getMovies();
    expect(movies.length).toBe(4);
    expect(movies).toEqual([
      { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
      { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola' },
      { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan' },
      { id: 4, title: 'Pulp Fiction', director: 'Quentin Tarantino' }
    ]);
  });
  it('should return a movie by id',()=>{
    let movie = getMovieById(1);
    expect(movie).toEqual({ id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' });
  });
it('should return undefine for a non-existant book',()=>{
  let movie = getMovieById(97);
  expect(movie).toBeUndefined();
});
it('should add a new movie',()=>{
  let newMovie  = { title: 'New Movie', director: 'Director Name' };
  let addedMovie = addMovies(newMovie);
  expect(addedMovie).toEqual({ id: 5, title: 'New Movie', director: 'Director Name' });
  const movies = getMovies();
  expect(movies.length).toBe(5);
});
  
});