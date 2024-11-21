const express = require('express');
const app = express();
app.use(express.json());

let games = [
  {
    id: 1,
    title: 'The Legend of Zelda',
    genre: 'Adventure',
    developer: 'Nintendo',
  },
  {
    id: 2,
    title: 'Super Mario Bros',
    genre: 'Platformer',
    developer: 'Nintendo',
  },
];

let developer = [{ id: 1, name: 'Nintendo', country: 'Japan' }];

async function getGames() {
  return games;
}

async function getGameById(id) {
  return games.find((game) => game.id === id);
}

async function addGame(game) {
  game.id = games.length + 1;
  games.push(game);
  return game;
}

async function getDeveloperById(id) {
  return developer.find((dev) => dev.id === id);
}

async function addDeveloper(dev) {
  dev.id = developer.length + 1;
  developer.push(dev);
  return dev;
}

app.get('/games', async (req, res) => {
  let result = await getGames();
  res.json(result);
});

app.get('/games/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getGameById(id);
  if (!result) {
    return res.status(404).json('Data not found!');
  }
  res.json(result);
});

app.post('/games/new', async (req, res) => {
  let result = await addGame(req.body);
  res.status(201).json(result);
});

app.get('/developers/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getDeveloperById(id);
  if (!result) {
    return res.status(404).json('Data not found!');
  }
  res.json(result);
});

app.post('/developers/new', async (req, res) => {
  let result = await addDeveloper(req.body);
  res.status(201).json(result);
});

module.exports = {
  app,
  getGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
};
