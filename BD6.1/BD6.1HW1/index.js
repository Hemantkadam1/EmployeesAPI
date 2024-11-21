let {getMovies , getMovieById , addMovies} = require("./movies");
const express = require("express");
const app =express();
const PORT = 3000;
app.use(express.json());

app.get("/api/movies",(req,res)=>{
  res.json(getMovies());

});
app.get("/api/movies/:id",(req,res)=>{
  const movie = getMovieById(parseInt(req.params.id));
  if(!movie) return res.status(404).send("book not found");
  res.json(movie);
});

app.post("/api/movies",(req,res)=>{
  const movie = addMovies(req.body);
  res.status(201).json(movie);
});
app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
});
module.exports = app
