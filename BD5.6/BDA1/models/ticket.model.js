const { title } = require("process");
let {DataTypes , sequelize} = require("../lib/");
let ticket = sequelize.define("ticket",{
  ticketId:DataTypes.INTEGER,
  title:DataTypes.TEXT,
  description:DataTypes.TEXT,
status:DataTypes.TEXT,
priority:DataTypes.INTEGER,
customerId:DataTypes.INTEGER,
agentId:DataTypes.INTEGER,
});
module.exports = {
  ticket,
}
