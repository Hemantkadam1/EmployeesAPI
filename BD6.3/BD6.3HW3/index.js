const express = require('express');
const app = express();
app.use(express.json());

let recipes = [
	{ 
		 id: 1, 
		 name: 'Spaghetti Bolognese', 
		 cuisine: 'Italian', 
		 difficulty: 'Medium' 
	},
  { 
		  id: 2, 
		  name: 'Chicken Tikka Masala', 
		  cuisine: 'Indian', 
		  difficulty: 'Hard' ,
	}
];



async function getRecipes() {
  return recipes;
}

async function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

async function addRecipe(recipe) {
  recipe.id = recipes.length + 1;
  recipes.push(recipe);
  return recipe;
}

app.get('/recipes', async (req, res) => {
  let result = await getRecipes();
  res.json(result);
});

app.get('/recipes/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getRecipeById(id);
  if (!result) {
    return res.status(404).json('Data not found!');
  }
  res.json(result);
});

app.post('/recipes/new', async (req, res) => {
  let result = await addRecipe(req.body);
  res.status(201).json(result);
});




module.exports = {
  app,
  getRecipes,
  getRecipeById,
  addRecipe,
 
};
