'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    name: DataTypes.STRING,
    twitter: DataTypes.STRING,
    class: DataTypes.ENUM('admin', 'normal'),
    note: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    underscored: true,
    freezeTableName: true,
  });
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
