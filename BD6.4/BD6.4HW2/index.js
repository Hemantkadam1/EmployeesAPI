let {getGames , getGameById, getAllGenres ,getGenreById }=require("./game");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/games",async(req,res)=>{
  try{
const game = await getGames();
if(game.length === 0)
{
  return res.status(404).json({error:"No games found"});
}
return res.json(game);
  }catch(error)
  {
return res.status(500).json({error:"Internal server error"});
  }
});

app.get("/games/:id",async(req,res)=>{
  try{
    const game = await getGameById(parseInt(req.params.id));
    if(!game){
       return res.status(404).json({error:"Game not found"});
  }
    return res.json(game);
  }catch(error){
    res.status(500).json({error:"internal Server Error"});
  }
});

app.get("/genres",async(req,res)=>{
  try{
  const genres = await getAllGenres()
  if(genres.length === 0)
  {
    return res.status(404).json({error:"not found any genres"});
  }
  return res.json(genres);
}catch(error)
{
  return res.status(500).json({error:"Internal server error"});
}
})
app.get("/genres/:id",async(req,res)=>{
  try{
  let id = parseInt(req.params.id);
  const genre = await getGenreById(id);
  if(!genre)
  {
    return res.status(404).json({error:"no genres is found"});
  }
  return res.json(genre)
}catch(error)
{
  return res.status(500).json({error:"Internal server error"})
}
});


module.exports = {app};