const express = require("express");
const app = express();
app.use(express.json());

let products = [
  { productId: 1, name: 'Laptop',category: 'Electronics' },
  { productId: 2, name: 'Coffee Maker', category: 'Appliances' },
  { productId: 3, name: 'Headphones', category: 'Electronics' },
  { productId: 4, name: 'Running Shoes', category: 'Footwear' }
];

function getproducts()
{
  return products;
}
function getProductsById(productId)
{
  return products.find((product)=> product.productId === productId);
}
function addProduct(product){
  products.push(product)
  return product;
}
app.get("/products",(req,res)=>{
  res.json(getproducts());
});
app.get("/products/details/:productId",(req,res)=>{
  let productId =parseInt(req.params.productId);
  let product = getProductsById(productId);
  if(product){
    res.json(product);
  }else{
    res.status(404).send("product not found");
  }
});

app.post("/product/new",(req,res)=>{
  let product = req.body;
  let addedproduct = addProduct(product);
  res.status(201).json(addedproduct);
})

module.exports = {app, getproducts , getProductsById , addProduct};