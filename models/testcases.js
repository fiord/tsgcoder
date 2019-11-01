'use strict';
module.exports = (sequelize, DataTypes) => {
  const testcases = sequelize.define('testcases', {
    name: DataTypes.STRING,
    input_path: DataTypes.STRING,
    output_path: DataTypes.STRING,
    result: DataTypes.ENUM(
      'WJ',
      'CE',
      'RE',
      'WA',
      'TLE',
      'MLE',
      'OLE',
      'IE',
      'AC'
    ),
    submission_id: DataTypes.BIGINT,
    exec_id: DataTypes.BIGINT
  }, {
    underscored: true,
  });
  testcases.associate = function(models) {
    // associations can be defined here
  };
  return testcases;
};
