'use strict';
module.exports = (sequelize, DataTypes) => {
  const exec = sequelize.define('exec', {
    author_id: DataTypes.BIGINT,
    lang: DataTypes.INTEGER,
    code: DataTypes.TEXT,
    compile: DataTypes.TEXT,
    stdin: DataTypes.TEXT,
    stdout: DataTypes.TEXT,
    stderr: DataTypes.TEXT,
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
