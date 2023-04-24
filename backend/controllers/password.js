const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

exports.forgotPassword = (req, res, next)=>{

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = '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';

const transEmailApi = new Sib.TransactionalEmailsApi()

const sender = {
    email: 'y.yashgupta03@gmail.com',
    name:'yash g',
}

const receivers = [{
    email: req.body.email,
    // email: 'yashsaygupta@gmail.com',
},]

transEmailApi.sendTransacEmail({
    sender,
    to:receivers,
    subject:'reset your password',
    textContent:'your otp is 1234',
}).then((response)=>{
    console.log(res);
    res.status(200).json('Email Sent');
})
.catch(err=>console.log(err));    
}