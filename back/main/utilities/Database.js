const dotenv=require('dotenv');
dotenv.config();
const {Sequelize}=require ('sequelize');

const sequelize = new Sequelize(
    process.env.ORACLE_DATABASE,
    process.env.ORACLE_USER,
    process.env.ORACLE_PASSWORD, 
    {
        host: process.env.ORACLE_HOST||'localhost',   // e.g., localhost or your server IP
        port: process.env.ORACLE_PORT||1521,                      // Default Oracle port
        dialect: 'oracle',               // Specify the dialect
        logging: false,
        dialectOptions: {
        connectString: process.env.ORACLE_CONNECTION_STRING ||'localhost:1521/freepdb1', // Easy Connect syntax
        },
    }
);
const testConnection = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return true;
    }catch(error){
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};
const closeConnection = async () => {
    if(sequelize){
        try{
            await sequelize.close();
            console.log('OracleDB connection closed');
        }catch(err){
            console.error('Unable to close OracleDB connection:', err);
            process.exit(1);
        }
    }
}
module.exports = {sequelize,testConnection,closeConnection};
