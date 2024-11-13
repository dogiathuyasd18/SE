import {DataTypes,Model} from 'sequelize'

class Inventory extends Model{}
Inventory.init({
    FruitID:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        foreignKey:true,
        field:'fruit_id'
    },
    FruitStock:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:0,
        field:'fruit_stock'
    },
},{
    sequelize,
    modelName:'Inventory',
    tableName:'Inventories',
    timestamps:false,
});
export default Inventory;