let sq = require("sequelize");
let sequelize = new sq.Sequelize({
  dialect:"sqlite",
  storage:"./BD5.4/BD5.4CW/database.sqlite",
});
module.exports = {DataTypes:sq.DataTypes,sequelize};