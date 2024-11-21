let {DataTypes , sequelize} = require("../lib/");
let emp = sequelize.define("emp",{
  name:DataTypes.TEXT,
  designation:DataTypes.TEXT,
  department:DataTypes.TEXT,
  salary:DataTypes.INTEGER

});
module.exports = {
  emp,
}