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
    filename: './BD4Assignments/BD4Assignment1/database.sqlite',
    driver: sqlite3.Database,
  });
})();
//Exercise 1: Get All Restaurants
async function fetchAllRestaurants()
{
  let query ="SELECT * FROM restaurants";
  let response = await db.all(query,[]);
  return{restaurants:response};
}
app.get("/restaurants",async(req,res)=>{
  try{
  let results = await fetchAllRestaurants()
  if(results.restaurants.length === 0)
  {
    return res.status(404).json({message:"not found restaurants"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});

//Exercise 2: Get Restaurant by ID
async function fetchRestaurantById(id)
{
  let query ="SELECT * FROM restaurants WHERE id = ?";
  let response = await db.all(query,[id]);
  return{restaurants:response};
}
app.get("/restaurants/details/:id",async(req,res)=>{
  let id=parseInt(req.params.id);
  try{
    let results = await fetchRestaurantById(id);
    if(results.restaurants.length === 0)
    {
      return res.status(404).json({message:"not found any restaurants by"+id});
    }
    return res.status(200).json(results);
  }catch(error)
  {
    return res.status(500).json({error:error.message});
  }
})
//Exercise 3: Get Restaurants by Cuisine

async function getRestaurantsByCuisine(cuisine)
{
  let query ="SELECT * FROM restaurants WHERE cuisine = ?";
  let response = await db.all(query,[cuisine]);
  return{restaurants:response};
}
app.get("/restaurants/cuisine/:cuisine",async(req,res)=>{
  let cuisine = req.params.cuisine;
  try{
  let results = await getRestaurantsByCuisine(cuisine);
  if(results.restaurants.length === 0)
  {
    return res.status(404).json({message:"not found nay restaurants by"+cuisine});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
});
//Exercise 4: Get Restaurants by Filter
async function getRestaurantsByFilter(isVeg,hasOutdoorSeating,isLuxury)
{
  let query = "SELECT * FROM restaurants  WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury= ? ";
  let response = await db.all(query,[isVeg,hasOutdoorSeating,isLuxury]);
  return{restaurants:response};
}
app.get("/restaurants/filter",async(req,res)=>{
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating =  req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
 try{
  let results = await getRestaurantsByFilter(isVeg,hasOutdoorSeating,isLuxury);
  if(results.restaurants.length === 0)
  {
    return res.status(404).json({message:"not found"});
  }
return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});
//Exercise 5: Get Restaurants Sorted by Rating
async function fetchRestaurantsSortedByRating()
{
  let query ="SELECT * FROM restaurants ORDER BY rating DESC";
  let response = await db.all(query,[]);
  return{restaurants:response};
}
app.get("/restaurants/sort-by-rating",async(req,res)=>{

  try{
  let results = await fetchRestaurantsSortedByRating();
  if(results.restaurants.length === 0)
  {
    return res.status(404).json({message:"not found "});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});

//Exercise 6: Get All Dishes
async function getAllDishes()
{
  let query ="SELECT * FROM dishes";
  let response = await db.all(query,[]);
  return{dishes:response}
}
app.get("/dishes",async(req,res)=>{
 try{
  let results = await getAllDishes();
  if(results.dishes.length === 0)
  {
    return res.status(404).json({message:"not found dishes"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 7: Get Dish by ID
async function getDishById(id)
{
  let query ="SELECT * FROM dishes WHERE id =?";
  let response = await db.all(query,[id]);
  return{dishes:response};
}
app.get("/dishes/details/:id",async(req,res)=>{
  let id = req.params.id;
 try{
  let results = await getDishById(id);
  if(results.dishes.length === 0)
  {
    return res.status(404).json({message:"not found any dishes"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 8: Get Dishes by Filter
async function getDishesByFilter(isVeg) {
  let query = 'SELECT * FROM dishes WHERE isVeg=?';
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get('/dishes/filter', async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    let result = await getDishesByFilter(isVeg);
    if (result.dishes.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Dishes Found for Filter "isVeg"= ' + isVeg });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Exercise 9: Get Dishes Sorted by Price
async function getDishesSortedByPrice()
{
  let query = "SELECT * FROM dishes ORDER BY price ASC";
  let response = await db.all(query,[]);
  return{dishes:response};
}
app.get("/dishes/sort-by-price",async(req,res)=>{
 try{
  let results = await getDishesSortedByPrice()
  if(results.dishes.length === 0)
  {
    return res.status(404).json({message:"not found"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
app.listen(PORT, () => console.log('server running on port 3000'));