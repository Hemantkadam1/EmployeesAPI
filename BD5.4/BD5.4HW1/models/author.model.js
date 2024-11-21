let {DataTypes , sequelize} =require("../lib");
let author = sequelize.define("author",{
  
  name:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false,
  },
  birthYear:{
    type:DataTypes.INTEGER,
   allowNull:false,
  },
});
module.exports = {author};
