const express=require('express');
const axios=require('axios');
const crypto=require('crypto');
const config=require('./config-payment.js');
const router=express.Router();

//Payment Link

router.post("/payment",async (req,res)=>{
    let{
        accessKey,
        secretKey,
        orderInfo,
        partnerCode,
        redirectUrl,
        ipnUrl,
        requestType,
        extraData,
        orderGroupId,
        autoCapture,
        lang,
    }=config;
    var amount='50000';
    var orderId= partnerCode + new Date().getTime();
    var requestId=orderId;
    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + 
    accessKey + 
    "&amount=" + 
    amount + 
    "&extraData=" + 
    extraData + 
    "&ipnUrl=" + 
    ipnUrl + 
    "&orderId=" + 
    orderId + 
    "&orderInfo=" + 
    orderInfo + 
    "&partnerCode=" + 
    partnerCode + 
    "&redirectUrl=" + 
    redirectUrl + 
    "&requestId=" + 
    requestId + 
    "&requestType=" + 
    requestType;
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        partnerName : "Test",
        storeId : "MomoTestStore",
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        lang : lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData : extraData,
        orderGroupId: orderGroupId,
        signature : signature
    });
    //Axios 
    const options={
        method:"POST",
        url:"https://test-payment.momo.vn/v2/gateway/api/create",
        headers:{
            'Content-Type':'application/json',
            'Content-Length':Buffer.byteLength(requestBody)
        },
        data:requestBody,
    }
    let result;
    try{
        result=await axios(options);
        return res.status(200).json(result.data);
    }catch(error){
        return res.status(500).json({statusCode:500,message:"Internal server error"});
    }
});

router.post("/callback",async (req,res)=>{
    console.log("Callback: ");
    console.log(req.body);
    /** 
 * Based on the result to update payment status
 * {
 * "partnerCode": 'MOMO',
 * orderId:'MOMO1712108682648',
 * requestId":'MOMO1712108682648',
 * amount:50000,
 * orderInfo":'pay with MoMo',
 * transId:'4014083433',
 * message:'Success',
 * payType:'qr',
 * responseTime:'1712108811069',
 * extraData:',
 * signature:'10398fbe70cd3052f443da99f7c4befbf49ab0d0c6cd7dc14efffd6e09a526c0'}
*/
    //Update order
    return res.status(200).json(req.body);
});
router.post("/transaction-status",async (req,res)=>{
    const{orderId}=req.body;
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var accessKey = 'F8BBA842ECF85';
    const rawSignature=`accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
    const signature= crypto
    .createHmac('sha256',secretKey)
    .update(rawSignature)
    .digest('hex');
    const requestBody=JSON.stringify({
        partnerCode:"MOMO", 
        requestId:orderId,
        orderId:orderId,
        signature:signature,
        lang:'vi'
    })
    //Axios
    const options={
        method:"POST",
        url:"https://test-payment.momo.vn/v2/gateway/api/query",
        headers:{
            'Content-Type':'application/json',
            
        },
        data:requestBody
    }
    const result=await axios(options);
    return res.status(200).json(result.data);
});
module.exports=router;