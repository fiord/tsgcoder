'use strict';
module.exports = (sequelize, DataTypes) => {
  const lang = sequelize.define('lang', {
    name: DataTypes.STRING,
    commands: DataTypes.STRING
  }, {
    underscored: true,
  });
  lang.associate = function(models) {
    // associations can be defined here
  };
  return lang;
};
