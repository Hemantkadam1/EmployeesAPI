const express = require("express");
const app = express();
app.use(express.json());

let movies = [
  { movieId: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
  { movieId: 2, title: 'The Godfather', director: 'Francis Ford Coppola' },
  { movieId: 3, title: 'The Dark Knight', director: 'Christopher Nolan' }
];

function getMovies()
{
  return movies;
}
function getMoviesBymovieId(movieId)
{
  return movies.find((movie)=> movie.movieId === movieId);
}
function addMovies(movie){
  movies.push(movie)
  return movie;
}
app.get("/movies",(req,res)=>{
  res.json(getMovies());
});
app.get("/movies/details/:movieId",(req,res)=>{
  let movieId =parseInt(req.params.movieId);
  let movie = getMoviesBymovieId(movieId);
  if(movie){
    res.json(movie);
  }else{
    res.status(404).send("movie not found");
  }
});

app.post("/movie/new",(req,res)=>{
  let movie = req.body;
  let addedmovie = addMovies(movie);
  res.status(201).json(addedmovie);
})

module.exports = {app, getMovies , getMoviesBymovieId , addMovies};