'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('testcases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      input_path: {
        type: Sequelize.STRING
      },
      output_path: {
        type: Sequelize.STRING
      },
      result: {
        type: Sequelize.ENUM(
          'WJ',
          'CE',
          'RE',
          'WA',
          'TLE',
          'MLE',
          'OLE',
          'IE',
          'AC'
        )
      },
      submission_id: {
        type: Sequelize.BIGINT
      },
      exec_id: {
        type: Sequelize.BIGINT
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
    return queryInterface.dropTable('testcases');
  }
};
