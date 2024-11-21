let express = require("express");
let {post} = require("./models/post.model");
let {sequelize} = require("./lib/index");
const {parse} = require("querystring");
let app = express();

app.use(express.json());


let Data = [
  {
    title: 'Getting Started with Node.js',
    content:
      'This post will guide you through the basics of Node.js and how to set up a Node.js project.',
    author: 'Alice Smith',
  },
  {
    title: 'Advanced Express.js Techniques',
    content:
      'Learn advanced techniques and best practices for building applications with Express.js.',
    author: 'Bob Johnson',
  },
  {
    title: 'ORM with Sequelize',
    content:
      'An introduction to using Sequelize as an ORM for Node.js applications.',
    author: 'Charlie Brown',
  },
  {
    title: 'Boost Your JavaScript Skills',
    content:
      'A collection of useful tips and tricks to improve your JavaScript programming.',
    author: 'Dana White',
  },
  {
    title: 'Designing RESTful Services',
    content: 'Guidelines and best practices for designing RESTful APIs.',
    author: 'Evan Davis',
  },
  {
    title: 'Mastering Asynchronous JavaScript',
    content:
      'Understand the concepts and patterns for writing asynchronous code in JavaScript.',
    author: 'Fiona Green',
  },
  {
    title: 'Modern Front-end Technologies',
    content:
      'Explore the latest tools and frameworks for front-end development.',
    author: 'George King',
  },
  {
    title: 'Advanced CSS Layouts',
    content:
      'Learn how to create complex layouts using CSS Grid and Flexbox.',
    author: 'Hannah Lewis',
  },
  {
    title: 'Getting Started with React',
    content: 'A beginners guide to building user interfaces with React.',
    author: 'Ian Clark',
  },
  {
    title: 'Writing Testable JavaScript Code',
    content:
      'An introduction to unit testing and test-driven development in JavaScript.',
    author: 'Jane Miller',
  },
];

app.get("/seed_db",async(req,res)=>{
  try{
await sequelize.sync({force:true});
await post.bulkCreate(Data);
res.status(200).json({message:"Database seeding successful"});
  }catch(error){
    res.status(500).json({message:"Error seeding the data",error:error.message});
  }
});

//Exercise 1: Fetch all posts
async function fetchAllPosts()
{
  let posts = await post.findAll();
  return {post:posts};
}

app.get("/posts",async(req,res)=>{
  try{

  let result = await fetchAllPosts();
  if(result.post.message === 0)
  { 
    return res.status(404).json({message:"not found"});
}
return res.status(200).json(result);

  }catch(error)
  {
    return res.status(500).json({error:error.message});
  }
})
//Exercise 2: Add a new post in the database
async function addNewPost(postData)
{
  let newPost = await post.create(postData);
  return {newPost};
}
app.post("/posts/new",async(req,res)=>{
try{
let newPost = req.body.newPost;
let response = await addNewPost(newPost);
return res.status(200).json(response);
}catch(error)
{
   res.status(500).json({error:error.message});
}
})

//Exercise 3: Update post information
async function updatePostById(updatedPostData,id)
{
  let postDetails = await post.findOne({where:{id}});
  if(!postDetails)
  {
    return {}
  }
  postDetails.set(updatedPostData)
  let updatedPost = await postDetails.save();
  return {message:"Post updated successfully",updatedPost};
}
app.post("/posts/update/:id",async(req,res)=>{
  try{
    let newPostData =req.body;
    let id = parseInt(req.params.id);
    let response = await updatePostById(newPostData,id);
    if(!response.message)
    {
      return res.status(404).json({message:"Post not found"});
    }
    return res.status(200).json(response);
    }catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});
//Exercise 4: Delete a post from the database
async function deletePostById(id)
{
  let destroyedPost = await post.destroy({where:{id}});
  if(destroyedPost === 0)return{}
  return {message:"post record deleted"};

}
app.post("/posts/delete",async(req,res)=>{
  try{
let id = parseInt(req.body.id)
let response = await deletePostById(id);
if(!response.message)
{
  return res.status(404).json({message:"Track not found"});
}
return res.status(200).json(response);
  }catch(error)
  {
    res.status(500).json({error:error.message});
  }
})


app.listen(3000,()=>{
  console.log("Server is running on port 3000");
})