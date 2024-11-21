let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './BD4Assignments/BD4Assignment2/database.sqlite',
    driver: sqlite3.Database,
  });
})();
//Exercise 1: Get All Games
async function getAllGames()
{
  let query = "SELECT * FROM games";
  let response = await db.all(query,[]);
  return{games:response};
}
app.get("/games",async(req,res)=>{
  try{
  let results = await getAllGames();
  if(results.games.length === 0)
  {
    return res.status(404).json({message:"not found any games"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 2: Get Game by ID
async function getGameById(id)
{
  let query = "SELECT * FROM games WHERE id = ?";
  let response = await db.all(query,[id]);
  return{games:response};
}
app.get("/games/details/:id",async(req,res)=>{
 try{
  let id =parseInt(req.params.id);
  let results = await getGameById(id);
  if(results.games.length === 0)
  {
    return res.status(404).json({message:"not found any game by ID"+id});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});
//Exercise 3: Get Games by Genre
async function getGamesByGenre(genre)
{
  let query = "SELECT * FROM games WHERE genre =?";
  let response = await db.all(query,[genre]);
  return{games:response};
}
app.get("/games/genre/:genre",async(req,res)=>{
 try{
  let genre = req.params.genre;
  let results =await getGamesByGenre(genre);
  if(results.games.length === 0)
  {
    return res.status(404).json({message:"not found games by "+genre});
  }
  return res.status(200).json(results);
}catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});
//Exercise 4: Get Games by Platform
async function getGamesByPlatform(platform)
{
  let query = "SELECT * FROM games WHERE platform = ?";
  let response = await db.all(query,[platform]);
   return {games:response};
}
app.get("/games/platform/:platform",async(req,res)=>{
  try{
  let platform = req.params.platform;
  let results = await  getGamesByPlatform(platform);
  if(results.games.length === 0)
  {
return res.status(404).json({message:"not found any game by "+platform})
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});
//Exercise 5: Get Games Sorted by Rating
async function getGamesSortedByRating()
{
  let query ="SELECT * FROM games ORDER BY rating DESC";
  let response = await db.all(query,[]);
  return{games:response};
}
app.get("/games/sort-by-rating",async(req,res)=>{
  try{
  let results = await  getGamesSortedByRating();
  if(results.games.length === 0)
  {
    return res.status(404).json({message:"not found any game by rating"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});
//Exercise 6: Get All Players
async function getAllPlayers()
{
  let query ="SELECT * FROM players";
  let response = await db.all(query,[]);
  return{players:response};
}
app.get("/players",async(req,res)=>{
  try{
  let results = await getAllPlayers();
  if(results.players.length === 0)
  {
    return res.status(404).json({message:"not found any players "});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 7: Get Player by ID
async function getPlayerById(id)
{
  let query = "SELECT * FROM players WHERE id = ?";
  let response = await db.all(query,[id]);
  return {players:response};
}
app.get("/players/details/:id",async(req,res)=>{
 try{
  let id = req.params.id;
  let results = await getPlayerById(id);
  if(results.players.length === 0)
  {
    return res.status(404).json({message:"not found any player by"+id});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 8: Get Players by Platform
async function getPlayersByPlatform(platform)
{
  let query ="SELECT * FROM players WHERE platform =?";
  let response = await db.all(query,[platform]);
  return {players:response};
}
app.get("/players/platform/:platform",async(req,res)=>{
  let platform = req.params.platform;
  try{
  let results = await getPlayersByPlatform(platform);
  if(results.players.length === 0)
  {
    return res.status(404).json({message:"not found players by platform"+platform});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});
//Exercise 9: Get Players Sorted by Rating
async function getPlayersSortedByRating()
{
  let query="SELECT * FROM players ORDER BY rating DESC ";
  let response = await db.all(query,[]);
  return{players:response};
}
app.get("/players/sort-by-rating",async(req,res)=>{
 try{
  let results = await getPlayersSortedByRating();
  if(results.players.length === 0)
  {
    return res.status(404).json({message:"not found players by rating"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 10: Get All Tournaments
async function getAllTournaments()
{
  let query = "SELECT * FROM tournaments";
  let response = await db.all(query,[]);
  return {tournaments:response};
}
app.get("/tournaments",async(req,res)=>{
 try{
  let results = await getAllTournaments();
  if(results.tournaments.length === 0)
  {
    return res.status(404).json({message:"not found any tournaments"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 11: Get Tournament by ID
async function getTournamentById(id)
{
  let query = "SELECT * FROM tournaments WHERE id =?";
  let response = await db.all(query,[id]);
  return { tournaments:response};
}
app.get("/tournaments/details/:id",async(req,res)=>{
  let id = parseInt(req.params.id);
 try{
  let results = await getTournamentById(id);
  if(results.tournaments.length === 0)
  {
    return res.status(404).json({message:"not found nad tournaments by"+id});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 12: Get Tournaments by Game ID
async function getTournamentsByGameId(id)
{
  let query = "SELECT * from tournaments WHERE id = ?";
  let response = await db.all(query,[id]);
  return{tournaments:response};
}
app.get("/tournaments/game/:id",async(req,res)=>{
  let id = parseInt(req.params.id);
 try{
  let results = await  getTournamentsByGameId(id);
  if(results.tournaments.length === 0)
  {
    return res.status(404).json({message:"not found tournaments by game id"+id});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 13: Get Tournaments Sorted by Prize Pool
async function getTournamentsSortedByPrizePool()
{
  let query= "SELECT * FROM tournaments ORDER BY prizePool DESC";
  let response = await db.all(query,[]);
  return{tournaments:response};
}
app.get("/tournaments/sort-by-prize-pool",async(req,res)=>{
 try{
  let results = await getTournamentsSortedByPrizePool();
  if(results.tournaments.length === 0)
  {
    return res.status(404).json({message:"not found tournaments by price"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});
app.listen(PORT, () => console.log('server running on port 3000'));