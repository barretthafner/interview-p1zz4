module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Topping',
      [
        {
          name: 'Pepperoni',
          price: 2.25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Extra Cheese',
          price: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mushrooms',
          price: 1.25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sausage',
          price: 2.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Roasted Red Peppers',
          price: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Black Olives',
          price: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Pineapple',
          price: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Topping', null, {});
  },
};
