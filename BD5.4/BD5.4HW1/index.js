let express = require('express');
let { author } = require('./models/author.model');
let { sequelize } = require('./lib/index');
const { parse } = require('querystring');
const { book } = require('./models/book.model');
let app = express();
app.use(express.json());
let books = [
  {
    title: 'Harry Potter and the Philosophers Stone',
    genre: 'Fantasy',
    publicationYear: 1997,
  },
  { title: 'A Game of Thrones', genre: 'Fantasy', publicationYear: 1996 },
  { title: 'The Hobbit', genre: 'Fantasy', publicationYear: 1937 },
];

// authors
let authors = [{ name: 'J.K Rowling', birthYear: 1965 }];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(books);
  
    return res.status(200).json({ message: 'Database seeding successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});
//Exercise 1: Fetch all Author
async function fetchAllAuthors() {
  let authors = await author.findAll();
  return { author: authors };
}
app.get('/author', async (req, res) => {
  try {
    let result = await fetchAllAuthors();
    if (result.author.length === 0) {
      return res.status(404).json({ message: 'not found' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Exercise 1: Create New Author
async function addNewAuthor(authorData) {
  let newAuthor = await author.create(authorData);
  return { newAuthor };
}
app.post('/authors/new', async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    let response = await addNewAuthor(newAuthor);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
async function updateAuthorId(updatedAuthorData ,id)
{
  let authorDetails = await author.findOne({where:{id}});
  if(!authorDetails)
  {
    return {}
  }
  authorDetails.set(updatedAuthorData)
  let updatedAuthor = await authorDetails.save();
  return {message:"author updated successfully",updatedAuthor};

}
app.post("/authors/update/:id",async(req,res)=>{
  try{
    let newAuthorData = req.body.newAuthorData;
let id= parseInt(req.params.id);
let response = await updateAuthorId(newAuthorData ,id);
if(!response.message)
{
  return res.status(404).json({message:"Author not found"});
}
return res.status(200).json(response);
  }catch(error)
  {
    res.status(500).json({error:error.message});
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
