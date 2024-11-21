const express = require("express");
const app = express();
app.use(express.json());
let books = [];
let users = []

function validateUser(user){
  if(!user.name || typeof user.name !== "string"){
    return "Name is required and should be a string";
  }
  if(!user.email || typeof user.email !== "string"){
    return "Email is required and should be a string";
  }
}
app.post("/api/users",(req,res)=>{
  let error = validateUser(req.body);
  if(error) return res.status(400).send(error)

  let user = {id:users.length +1 , ...req.body};
  users.push(user);
  res.status(201).json(user);
});

app.post("/api/books")
module.exports ={app};