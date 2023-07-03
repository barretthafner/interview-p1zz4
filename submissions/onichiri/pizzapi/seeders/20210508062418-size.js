module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Size',
      [
        {
          name: '12 inch',
          price: 18.59,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '16 inch',
          price: 22.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '22 inch',
          price: 26.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Size', null, {});
  },
};
