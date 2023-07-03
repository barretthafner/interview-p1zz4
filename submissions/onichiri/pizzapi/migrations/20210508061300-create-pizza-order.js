module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PizzaOrder', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sizeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Size',
          key: 'id',
        },
      },
      sauceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Sauce',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('PizzaOrder');
  },
};
