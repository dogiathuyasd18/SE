import dotenv from 'dotenv';
dotenv.config();
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(process.env.ORACLE_DATABASE, process.env.ORACLE_USER, process.env.ORACLE_PASSWORD, {
    host: process.env.ORACLE_HOST,   // e.g., localhost or your server IP
    port: 1521,                      // Default Oracle port
    dialect: 'oracle',               // Specify the dialect
    logging: false,
    dialectOptions: {
        connectString: process.env.ORACLE_CONNECTION_STRING, // Easy Connect syntax
    },
});

export default sequelize;
