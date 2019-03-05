'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('execs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.TEXT
      },
      stdin: {
        type: Sequelize.TEXT
      },
      stdout: {
        type: Sequelize.TEXT
      },
      stderr: {
        type: Sequelize.TEXT
      },
      result: {
        type: Sequelize.ENUM(
          'WJ',
          'AC',
          'WA',
          'TLE',
          'MLE',
          'OLE',
          'RE',
        )
      },
      state: {
        type: Sequelize.ENUM(
          'pending',
          'executing',
          'finished'
        )
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('execs');
  }
};
