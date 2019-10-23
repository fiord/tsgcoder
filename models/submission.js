'use strict';
module.exports = (sequelize, DataTypes) => {
  const submission = sequelize.define('submission', {
    result: DataTypes.STRING
  }, {
    underscored: true,
  });
  submission.associate = function(models) {
    // associations can be defined here
  };
  return submission;
};