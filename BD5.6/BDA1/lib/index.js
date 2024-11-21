let sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect:"sqlite",
  storage:"./BD5.6/BDA1/database.sqlite",
});
module.exports = {DataTypes:sq.DataTypes,sequelize};