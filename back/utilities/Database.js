const dotenv = require('dotenv');
dotenv.config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.ORACLE_DATABASE,
    process.env.ORACLE_USER,
    process.env.ORACLE_PASSWORD,
    {
      host: process.env.ORACLE_HOST,
      port: process.env.ORACLE_PORT,
      dialect: 'oracle',
      logging: false,
    }
);
  
(async () => {
  try {
    // await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
