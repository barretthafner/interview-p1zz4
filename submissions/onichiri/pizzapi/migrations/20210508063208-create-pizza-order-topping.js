module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PizzaOrderTopping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pizzaOrderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PizzaOrder',
          key: 'id',
        },
      },
      toppingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Topping',
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
    await queryInterface.dropTable('PizzaOrderTopping');
  },
};
