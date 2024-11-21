let { DataTypes,sequelize}= require("../lib/");
let department = sequelize.define("department",{

  departmentId:DataTypes.INTEGER,
  name:DataTypes.TEXT,
});
module.exports = {
  department,
}