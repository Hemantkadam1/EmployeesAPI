let sq = require("sequelize");
let sequelize = new  sq.Sequelize({
  dialect:"sqlite",
  storage:"./BD5.3/BD5.3HW3/database.sqlite",
});
module.exports = {DataTypes:sq.DataTypes,sequelize};