let {getProducts , getProductById , addProduct} = require("./products");
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/api/products",(req,res)=>{
  res.json(getProducts());
});

app.get("/api/products/:id",(req,res)=>{
  const product = getProductById(parseInt(req.params.id));
  if(!product) return res.status(404).send("Product not found");
  res.json(product);
});

app.post("/api/products",(req,res)=>{
  const product = addProduct(req.body);
  res.status(201).json(product);
});
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});

module.exports =app;