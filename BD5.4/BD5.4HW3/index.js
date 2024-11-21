let express = require("express");
let {chef} = require("./models/chef.model");
let {sequelize} = require("./lib/index");
const {parse} = require("querystring");
const {dish} = require("./models/dish.model");
let app = express();
app.use(express.json());
let dishes =
[
  {
    name: 'Margherita Pizza',
    cuisine: 'Italian',
    preparationTime: 20,
  },
  {
    name: 'Sushi',
    cuisine: 'Japanese',
    preparationTime: 50,
  },
  {
    name: 'Poutine',
    cuisine: 'Canadian',
    preparationTime: 30,
  },
];

let chefs = [
  { name: 'Gordon Ramsay', birthYear: 1966 },
  { name: 'Masaharu Morimoto', birthYear: 1955 },
  { name: 'Ricardo Larrivée', birthYear: 1967 },
];

app.get("/seed_db",async(req,res)=>{
  try{
    await sequelize.sync({force:true});
    await dish.bulkCreate(dishes);
    res.status(200).json({message:"Database seeding successful"});
  }catch(error)
  {
    res.status(500).json({message:"Error seeding the data",error:error.message});
  }
});
//Exercise 1: Fetch all Dishes
async function fetchAllDishes()
{
  let dishes = await dish.findAll();
  return {dish:dishes};
}
app.get("/dishes",async(req,res)=>{
 try{
  let result = await fetchAllDishes();
  if(result.dish.length === 0)
  {
    return res.status(404).json({message:"not found"});
  }
  return res.status(200).json(result);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})

//Exercise 1: Fetch all chef
async function fetchAllChefs()
{
  let chefs = await chef.findAll();
  return {chef:chefs};
}
app.get("/chefs",async(req,res)=>{
 try{
  let result = await fetchAllChefs();
  if(result.chef.length === 0)
  {
    return res.status(404).json({message:"not found"});
  }
  return res.status(200).json(result);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})

async function addNewChef(chefData)
{
  let newChef = await chef.create(chefData);
  return{newChef};
}
app.post("/chefs/new",async(req,res)=>{
  try{
let newChef = req.body.newChef;
let response = await addNewChef(newChef);
return res.status(200).json(response);
  }catch(error)
  {
    res.status(500).json({error:error.message});
  }
});
async function updateChefById(updatedChefData ,id)
{
  let chefDetails = await chef.findOne({where:{id}});
  if(!chefDetails)
  {
    return {}
  }
  chefDetails.set(updatedChefData)
  let updatedChef = await chefDetails.save();
  return {message:"Chef updated successfully",updatedChef};

}
app.post("/chefs/update/:id",async(req,res)=>{
  try{
    let newChefData = req.body.newChefData;
let id= parseInt(req.params.id);
let response = await updateChefById(newChefData ,id);
if(!response.message)
{
  return res.status(404).json({message:"Chef not found"});
}
  }catch(error)
  {
    res.status(500).json({error:error.message});
  }
});

app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});

