let sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect:"sqlite",
  storage:"./BD5.5/BD5.5CW/database.sqlite",
});
module.exports = {DataTypes:sq.DataTypes,sequelize};