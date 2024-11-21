let {DataTypes , sequelize} = require("../lib");
let {employee} = require("./employee.model");
let {department} = require("./department.model");

let employeeDepartment = sequelize.define("employeeDepartment",{
  departmentId:{
    type:DataTypes.INTEGER,
    references:{
      model:department,
      key:"id",
    },
  },
  employeeId:{
    type:DataTypes.INTEGER,
    reference:{
      model:employee,
      key:"id",
    },
  },
});
employee.belongsToMany(department,{through:employeeDepartment});
department.belongsToMany(employee,{through:employeeDepartment});
module.exports = {employeeDepartment};