const express=require('express');
const router=express.Router();
const app=express();
const {searchFruit}=require('../controllers/searchFruit.js');
router.post('/',searchFruit);
module.exports=router;
