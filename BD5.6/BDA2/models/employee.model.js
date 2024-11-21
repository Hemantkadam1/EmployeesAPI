let {DataTypes , sequelize} = require("../lib/");
let  employee = sequelize.define("employee",{
  employeeId:DataTypes.INTEGER,
  name:DataTypes.TEXT,
  email:DataTypes.TEXT,
});
module.exports = {
  employee,
}
