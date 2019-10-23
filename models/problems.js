'use strict';
module.exports = (sequelize, DataTypes) => {
  const problems = sequelize.define('problems', {
    title: DataTypes.STRING,
    base_path: DataTypes.STRING
  }, {
    underscored: true,
  });
  problems.associate = function(models) {
    // associations can be defined here
  };
  return problems;
};
