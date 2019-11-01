'use strict';
module.exports = (sequelize, DataTypes) => {
  const submission = sequelize.define('submission', {
    problem_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    lang_id: DataTypes.BIGINT,
    code: DataTypes.TEXT,
    result: DataTypes.STRING
  }, {
    underscored: true,
  });
  submission.associate = function(models) {
    // associations can be defined here
  };
  return submission;
};
