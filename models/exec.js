'use strict';
module.exports = (sequelize, DataTypes) => {
  const exec = sequelize.define('exec', {
    author_id: DataTypes.INTEGER,
    lang: DataTypes.TEXT,
    code: DataTypes.TEXT,
    stdin: DataTypes.TEXT,
    stdout: DataTypes.TEXT,
    stderr: DataTypes.TEXT,
    result: DataTypes.ENUM(
      'WJ',
      'AC',
      'WA',
      'TLE',
      'MLE',
      'OLE',
      'RE',
    ),
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
