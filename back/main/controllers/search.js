const express=require('express');
const oracledb=require('oracledb');
const dotenv=require('dotenv');
const app=express();
app.use(express.json());

app.post('/search-fruit',async (req,res)=>{
    const {search}=req.body;
    let connection;
    try{
        connection=await oracledb.getConnection({
            user:process.env.ORACLE_USER,
            password:process.env.ORACLE_PASSWORD,
            connectString:process.env.ORACLE_CONNECTION_STRING,
        });
        const query=`SELECT FruitName FROM Fruit  WHERE LOWER(FruitName) LIKE '%${search}%'`;
        const result=await connection.execute(query,{
            search:`%$(search.toLowerCase())%`},
        {outFormat:oracledb.OUT_FORMAT_OBJECT});

        res.json(result.rows);
    }catch(error){
        console.log('Error connecting to Oracle DB',error);
        res.status(500).json({error:'Database connection failed'});
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(error){
                console.log('Error closing connection',error);
            }
        }
    }
});