let { DataTypes , sequelize} = require("../lib");
let {agent} = require("./agent.model");
let {customer} = require("./customer.model");
let { ticket } = require("./ticket.model");

let ticketCustomer = sequelize.define("ticketCustomer",{

  customerId:{
    type:DataTypes.INTEGER,
    references:{
      model:customer,
      ket:"id",
    },
  },
  ticketId:{
    type:DataTypes.INTEGER,
    references:{
      model:ticket,
      ket:"id",
    },
  },
});

//agent.belongsToMany(customer,{through:ticketCustomer});
//customer.belongsToMany(agent,{through:ticketCustomer});
//ticket.belongsToMany(agent,{through:ticketCustomer});
//agent.belongsToMany(ticket,{through:ticketCustomer});
ticket.belongsToMany(customer,{through:ticketCustomer});
customer.belongsToMany(ticket,{through:ticketCustomer});

module.exports = {ticketCustomer};