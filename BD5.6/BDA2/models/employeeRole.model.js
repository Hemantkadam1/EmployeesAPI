let {DataTypes , sequelize} = require("../lib");
let {employee} = require("./employee.model");
let {role} = require("./role.model");

let employeeRole = sequelize.define("employeeRole",{
  roleId:{
    type:DataTypes.INTEGER,
    references:{
      model:role,
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
employee.belongsToMany(role,{through:employeeRole});
role.belongsToMany(employee,{through:employeeRole});
module.exports = {employeeRole};