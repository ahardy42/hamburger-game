/*
* This table will hold burger types, each burger that's created is stored here.
*/

module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
      name: DataTypes.TEXT,
      isDevoured: DataTypes.BOOLEAN
    });
    return Burger;
}