'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('execs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author_id: {
        allowNull: true,
        type: Sequelize.BIGINT
      },
      lang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      code: {
        type: Sequelize.TEXT
      },
      compile: {
        type: Sequelize.TEXT,
        allowNull: true
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
