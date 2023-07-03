module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Sauce',
      [
        {
          name: 'Tomato',
          price: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Pesto',
          price: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'White',
          price: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Sauce', null, {});
  },
};
