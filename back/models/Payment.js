const {Model,DataTypes}=require('sequelize');
class Payment extends Model{}
Payment.init({
    PaymentID:{
        types:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        field:'payment_id'
    },
    OrderID:{
        types:DataTypes.BIGINT,
        foreignKey:true,
    },
    PaymentDate:{
        types:DataTypes.DATE,
        field:'payment_date'
    },
    PaymentAmount:{
        types:DataTypes.DECIMAL,
        field:'payment_amount'
    },
},{
    sequelize,
    modelName:'Payment',
    tableName:'Payments',
    timestamps:false,
});
module.exports={Payment};