'use strict';
module.exports = (sequelize, DataTypes) => {
  const exec = sequelize.define('exec', {
    author_id: DataTypes.BIGINT,
    lang_id: DataTypes.BIGINT,
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
    exec.belongsTo(models.users, {
      foreignKey: "author_id",
      targetKey: "id"
    });
    exec.belongsTo(models.lang, {
      foreignKey: "lang_id",
      targetKey: "id"
    });
  };
  return exec;
};
