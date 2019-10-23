'use strict';
module.exports = (sequelize, DataTypes) => {
  const cases = sequelize.define('cases', {
    name: DataTypes.STRING,
    input: DataTypes.STRING,
    output: DataTypes.STRING
  }, {
    underscored: true,
  });
  cases.associate = function(models) {
    // associations can be defined here
    
  };
  return cases;
};
