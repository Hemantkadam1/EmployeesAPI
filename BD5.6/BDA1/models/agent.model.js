let {DataTypes , sequelize} = require("../lib/");
let agent = sequelize.define("agent",{
  agentId:DataTypes.INTEGER,
  name:DataTypes.TEXT,
  email:DataTypes.TEXT,

});
module.exports = {
  agent,
}
