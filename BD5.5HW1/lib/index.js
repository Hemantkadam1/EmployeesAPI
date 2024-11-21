let sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect:"sqlite",
  storage:"./BD5.5/BD5.5HW1/database.sqlite",
});
module.exports = {DataTypes:sq.DataTypes,sequelize};