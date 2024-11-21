let {DataTypes ,sequelize} = require("../lib");
let user = sequelize.define("user",{
  username:{
    type:DataTypes.STRING,
    unique:true,
   allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    unique:true,
    validation:{
      isEmail:true,
    
    },
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
  },
});
module.exports ={user};