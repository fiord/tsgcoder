'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.changeColumn('users', 'id', {
      type: Sequelize.BIGINT
    })
    .then(() =>
      queryInterface.addColumn('users', 'email', {
        type: Sequelize.TEXT,
        allowNull: true,
        after: 'twitter'
      })
    ).then(() =>
      queryInterface.addColumn('users', 'image', {
        type: Sequelize.TEXT,
        allowNull: true,
        after: 'email'
      })
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('users', 'email')
      .then(() =>
        queryInterface.removeColumn('users', 'image')
      ).then(() =>
        queryInterface.changeColumn('users', 'id', {
          type: Sequelize.INTEGER,
        })
      );
  }
};
