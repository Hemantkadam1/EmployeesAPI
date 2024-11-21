let {DataTypes , sequelize} = require("../lib/");
let customer = sequelize.define("customer",{
  customerId:DataTypes.INTEGER,
  name:DataTypes.TEXT,
  email:DataTypes.TEXT,

});
module.exports = {
  customer,
}
