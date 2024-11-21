let express = require("express");
let {book} = require("./models/book.model");
let {like} = require("./models/like.model");
let {sequelize} = require("./lib/index");
let {user} = require("./models/user.model");
let {Op} = require("@sequelize/core");
const {parse} = require("querystring");
let app = express();
app.use(express.json());
const Data = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    year: 1960,
    summary: 'A novel about the serious issues of rape and racial inequality.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    year: 1949,
    summary: 'A novel presenting a dystopian future under a totalitarian regime.',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    year: 1851,
    summary: 'The narrative of the sailor Ishmael and the obsessive quest of Ahab.',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    year: 1813,
    summary: 'A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    year: 1925,
    summary: 'A novel about the American dream and the roaring twenties.',
  },
];
app.get("/seed_db",async(req,res)=>{
  try{
    await sequelize.sync({force:true});

    await user.create({
     username: "booklover",
     email: "booklover@gmail.com",
     password: "password123",
    });
await book.bulkCreate(Data);
res.status(200).json({message:"Database seeding successful"});
  }catch(error)
  {
    res.status(500).json({message:"Error seeding the data",error:error.message});
  }
});
//Exercise 1: Like a Book
async function likeBook(data)
{
  
  let newLike = await like.create({
    userId: data.userId,
    bookId: data.bookId,
  });
  return{message:"Book is  linked",newLike};

}
app.get("/users/:id/like",async(req,res)=>{
  try{
  let userId = req.params.userId;
  let bookId = req.query.bookId;
  let response = await likeBook(userId,bookId);
  return res.status(200).json(response);
}catch(error)
{
return res.status(500).json({error:error.message});
}
});



app.listen(3000, ()=>{
  console.log("Server is running on localhost 3000")
});