/*
* This table holds user information. basically, user name and ID at this point.
*/

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.TEXT
    });
    return User;
}