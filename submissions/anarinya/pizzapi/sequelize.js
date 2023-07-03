const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_STRING, {
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;
