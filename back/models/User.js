
import { DataTypes,Model} from 'sequelize'; // Adjust the path to your sequelize instance
import sequelize from '../main/utilities/Database.js'

class User extends Model {}
User.init({
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'user_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NA',
    },
    gender: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NA',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NA',
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      field: 'phone_number',
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      field: 'date_of_birth',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NA',
    },
    tier: {
      type: DataTypes.ENUM('bronze', 'silver', 'gold', 'platinum'),
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: 'User', // Choose the model name
  }
);
module.exports={User}; // Export the model
