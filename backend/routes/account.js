const express=require('express');
const authMiddleware=require('../midleware');
const { Account,User } = require('../db');
const { default: mongoose } = require('mongoose');

const router=express.Router();

router.get('/balance',authMiddleware,async(req,res)=>{
const account=await Account.findOne({
    userId:req.userId
})
    res.json({balance: account.balance});
})

router.post('/transfer',authMiddleware,async(req,res)=>{
    const{to,amount}=req.body;
   

    const session=await mongoose.startSession();
    session.startTransaction();


    const senderAccount = await Account.findOne({ userId: req.userId }).session(session);

    if (!senderAccount || senderAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }


    const recipientAccount = await Account.findOne({ userId: await User.findOne({ username: to }).select('_id') }).session(session);
    if(!recipientAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });

    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: recipientAccount._id }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
})

module.exports = router;