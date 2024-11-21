let {DataTypes , sequelize} = require("../lib/");
let comp = sequelize.define("comp",{
  name:DataTypes.TEXT,
  industry:DataTypes.TEXT,
  foundedYear:DataTypes.INTEGER,
  headquarters:DataTypes.TEXT,
  revenue:DataTypes.INTEGER,
});
module.exports = {
  comp,
}