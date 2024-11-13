import {DataTypes,Model} from 'sequelize'
class Order extends Model{}
Order.init({
    OrderId:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        field:'order_id'
    },
    OrderDate:{
        type:DataTypes.DATE,
        field:'order_date'
    },
    OrderStatus:{
        type:DataTypes.ENUM('pending','processing','completed','cancelled'),
        field:'order_status'
    },
    CustomerID:{
        type:DataTypes.BIGINT,
        foreignKey:true,
        field:'customer_id'
    },
},{
    sequelize,
    modelName:'Order',
    tableName:'Orders',
    timestamps:false,
    });
export default Order