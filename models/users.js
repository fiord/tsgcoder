'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    name: DataTypes.STRING,
    twitter: DataTypes.STRING,
    class: DataTypes.ENUM('admin', 'normal'),
    image: DataTypes.STRING,
    note: DataTypes.STRING,
  }, {
    underscored: true,
    freezeTableName: true,
  });
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.exec, {
      foreignKey: "author_id"
    });
  };
  return users;
};
