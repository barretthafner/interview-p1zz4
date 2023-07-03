const sequelize = require('./sequelize');
const { startApp } = require('./app');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
  startApp(7777);
})();
