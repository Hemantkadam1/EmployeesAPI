let {DataTypes , sequelize} =require("../lib");
let chef = sequelize.define("chef",{

 
  
  name:{
    type:DataTypes.STRING,
    unique:true,
   // allowNull:false,
  },
  birthYear:{
    type:DataTypes.INTEGER,
    unique:true,
    // validate:{
    //   isBirthYear:true,
    // },
  },

});
module.exports = {chef};
