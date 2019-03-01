'use strict';
module.exports = (sequelize, DataTypes) => {
  const exec = sequelize.define('exec', {
    code: DataTypes.TEXT,
    state: DataTypes.ENUM(
      'pending',
      'executing',
      'finished'
    ),
  }, {
    underscored: true,
  });
  exec.associate = function(models) {
    // associations can be defined here
  };
  return exec;
};
