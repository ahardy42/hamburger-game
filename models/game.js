/*
* This will hold game instances: game # burgers eaten, burger type and user who played
*/

module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
      user: DataTypes.TEXT,
      burger: DataTypes.TEXT,
      numEaten: DataTypes.INTEGER
    });
    return Game;
}