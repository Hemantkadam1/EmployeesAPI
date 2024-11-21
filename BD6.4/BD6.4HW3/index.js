let {  getAllArticles , getArticleById, getAllComments ,getCommentsById ,getUserById } =require("./articles.js");
const express = require("express");
const app = express();
app.use(express.json());
//Exercise 1: Get All Articles
app.get("/articles",async(req,res)=>{
  try{
const article = await  getAllArticles()
if(article.length === 0)
{
  return res.status(404).json({error:"not found articles"});
}
return res.json(article);
}catch(error)
{
  return res.status(500).json({error:"Internal server error"});
}
})
//Exercise 2 : Get Article by ID
app.get("/articles/:id",async(req,res)=>{
  try{
  let id = parseInt(req.params.id);
  let article = await getArticleById(id);
  if(!article)
  {
    return res.status(404).json({error:"article not found"});
  }
  return res.json(article);
}catch(error)
{
  return res.status(500).json({error:"Internal server error"});
}
});
//Exercise 3 : Get All Comments
app.get("/comments",async(req,res)=>{
  try{
  const comment = await getAllComments();
  if(comment.length === 0)
  {
    return res.status(404).json({error:"no comment found"});
  }
  return res.json(comment);
}catch(error)
{
return res.status(500).json({error:"Internal server error"});
}
})
//Exercise 4 : Get Comment by ID
app.get("/comments/:id",async(req,res)=>{
  try{
    let id= parseInt(req.params.id);
  let comment = await getCommentsById(id);
  if(!comment)
  {
    return res.status(404).json({error:"no comment found"});
  }
  return res.json(comment);
}catch(error)
{
  return res.status(500).json({error:"Internal server error"});
}
})

//Exercise 5 : Get User by ID
app.get("/users/:id",async(req,res)=>{
  try{
  let id = parseInt(req.params.id);
  let user = await getUserById(id);
  if(user.length === 0)
  {
    return res.status(404).json({error:"not found user"});
  }
  return res.json(user);
}catch(error)
{
  return res.status(500).json({error:"Internal server error"});
}
})

module.exports = {app};