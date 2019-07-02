/*
* This will hold game instances: game # burgers eaten, burger type and user who played
*/

module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
      userId: DataTypes.TEXT,
      burger: DataTypes.TEXT,
      numEaten: DataTypes.INTEGER
    });
    Game.associate = function(models) {
      Game.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Game;
}