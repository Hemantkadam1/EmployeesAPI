let express = require("express");
let {comp} = require("./models/company.model");
let {sequelize} = require("./lib/index");
const {parse} = require("querystring");
let app = express();
app.use(express.json());

let Data = [
  {
    'id': 1,
    'name': 'Tech Innovators',
    'industry': 'Technology',
    'foundedYear': 2010,
    'headquarters': 'San Francisco',
    'revenue': 75000000
  },
  {
    'id': 2,
    'name': 'Green Earth',
    'industry': 'Renewable Energy',
    'foundedYear': 2015,
    'headquarters': 'Portland',
    'revenue': 50000000
  },
  {
    'id': 3,
    'name': 'Innovatech',
    'industry': 'Technology',
    'foundedYear': 2012,
    'headquarters': 'Los Angeles',
    'revenue': 65000000
  },
  {
    'id': 4,
    'name': 'Solar Solutions',
    'industry': 'Renewable Energy',
    'foundedYear': 2015,
    'headquarters': 'Austin',
    'revenue': 60000000
  },
  {
    'id': 5,
    'name': 'HealthFirst',
    'industry': 'Healthcare',
    'foundedYear': 2008,
    'headquarters': 'New York',
    'revenue': 80000000
  },
  {
    'id': 6,
    'name': 'EcoPower',
    'industry': 'Renewable Energy',
    'foundedYear': 2018,
    'headquarters': 'Seattle',
    'revenue': 55000000
  },
  {
    'id': 7,
    'name': 'MediCare',
    'industry': 'Healthcare',
    'foundedYear': 2012,
    'headquarters': 'Boston',
    'revenue': 70000000
  },
  {
    'id': 8,
    'name': 'NextGen Tech',
    'industry': 'Technology',
    'foundedYear': 2018,
    'headquarters': 'Chicago',
    'revenue': 72000000
  },
  {
    'id': 9,
    'name': 'LifeWell',
    'industry': 'Healthcare',
    'foundedYear': 2010,
    'headquarters': 'Houston',
    'revenue': 75000000
  },
  {
    'id': 10,
    'name': 'CleanTech',
    'industry': 'Renewable Energy',
    'foundedYear': 2008,
    'headquarters': 'Denver',
    'revenue': 62000000
  }
];
app.get("/seed_db",async(req,res)=>{
  try{
    await sequelize.sync({force:true});
    await comp.bulkCreate(Data);
    res.status(200).json({message:"Database seeding successful"}); 
  }catch(error)
  {
    res.status(500).json({message:"Error seeding the data",error:error.message});
  }
});
//Exercise 1: Fetch all companies
async function fetchAllCompanies()
{
  let company = await comp.findAll();
  return{comp:company};
}
app.get("/companies",async(req,res)=>{
  try{
    result = await fetchAllCompanies();
    if(result.comp.length === 0)
    {
      return res.status(404).json({message:"not found any companies"});
    }
    return res.status(200).json(result);

  }catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});
//Exercise 2: Add a new company in the database
async function addNewCompany(compData)
{
  let newComp = await comp.create(compData);
  return {newComp};
}
app.post("/companies/new",async(req,res)=>{
 try{
  let newCompany =req.body.newCompany;
  let response = await addNewCompany(newCompany);
  return res.status(200).json(response);
 }catch(error)
 {
  return res.status(500).json({error:error.message});
 }
});
//Exercise 3: Update companies information
async function updateCompanyById(updatedCompanyData,id)
{
let compDetails = await comp.findOne({where:{id}});
if(!compDetails)
{
  return{}
}
compDetails.set(updatedCompanyData);
let updatedComp = await compDetails.save();
return {message:"Companies updated successfully",updatedComp};

}
app.post("/companies/update/:id",async(req,res)=>{
  try{
  let id = req.params.id;
  let newCompanyData = req.body.newCompanyData;
  let response = await updateCompanyById(newCompanyData,id);
  if(!response.message)
  {
    return res.status(404).json({message:"Employee not found"});
  }
  return res.status(200).json(response);
}catch(error)
{
return res.status(500).json({error:error.message});
}
});
//Exercise 4: Delete an company from the database
async function deleteCompanyById(id)
{
let destroyComp = await comp.destroy({where:{id}});
if(destroyComp === 0) return{}
return {message:"Employee record deleted"};
}
app.post("/companies/delete",async(req,res)=>{
  try{
  let id = req.body.id;
  let response = await deleteCompanyById(id);
  if(!response.message)
  {
    return res.status(404).json({message:"Employee not found"});
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