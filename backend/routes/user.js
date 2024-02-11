const express = require("express");
const z=require('zod');
const{User,Account}=require('../db');
const jwt=require('jsonwebtoken');
// const {JWT_SECRET}=require("../config");
const  authMiddleware  = require("../midleware");
const password = "sandeep"
const router=express.Router();

const signupSchema=z.object({
    username: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
	password: z.string()
})

const signinSchema=z.object({
    username: z.string().email(),
	password: z.string()
})

const updateSchema = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

router.post("/signup",async (req,res)=>{
const response=signupSchema.safeParse(req.body);
if(!response.success){
    return res.status(411).json({
        message: "Email already taken / Incorrect inputs"
    })
}
const existingUser = await User.findOne({
    username: req.body.username
})

if (existingUser) {
    return res.status(411).json({
        message: "Email already taken/Incorrect inputs"
    })
}


const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
})
const userId = user._id;


await Account.create({
userId:userId,
balance:(10000 * Math.random()).toFixed(2)
})

const token = jwt.sign({
    userId
}, password);

res.json({
    message: "User created successfully",
    token: token
})

})

router.post("/signin",async(req,res)=>{
    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(user){
        const token=jwt.sign({
            userId:user._id
        }, password);
        res.json({
            token: token
        })
        return;
    }
    
        res.status(411).json({
            message: "Error while logging in"
        })
    
})

router.put('/',authMiddleware, async(req,res)=>{
const  {success}=updateSchema.safeParse(req.body);
if (!success) {
    res.status(411).json({
        message: "Error while updating information"
    })
}
await User.updateOne({
    _id:req.userId
},req.body )
res.json({
    message: "Updated successfully"
})
})

router.get("/bulk",authMiddleware,async(req,res)=>{
    const filter =req.query.filter||"";
    const users= await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
         }]   
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

router.get('/currentUser',authMiddleware,async(req,res)=>{
    const userId=req.userId;
    const user= await User.findOne({_id:userId});
    return res.json({firstName:user.firstName});
})

module.exports = router;