let {DataTypes , sequelize} = require("../lib");
let {agent} = require("./agent.model");
let {ticket} = require("./ticket.model");

let ticketAgent = sequelize.define("ticketAgent",{
  agentId:{
    type:DataTypes.INTEGER,
    references:{
      model:agent,
      key:"id",
    },
  },
  ticketId:{
    type:DataTypes.INTEGER,
    references:{
      model:ticket,
      key:"id",

    },
  },
});
agent.belongsToMany(ticket,{through:ticketAgent});
ticket.belongsToMany(agent,{through:ticketAgent});
module.exports = {ticketAgent};