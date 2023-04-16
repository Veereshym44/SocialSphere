const express=require('express')
const router=express.Router()


const mongoose=require('mongoose')
const requireLogin=require('../middleware/requireLogin')
const User=mongoose.model("User");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


 

router.get('/',(req,res)=>{
    res.send("hello");
})
router.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body
    if(!email||!name||!password)
    return res.status(422).json({error:"fill all entries"})
    User.findOne({email})
    .then((savedUser)=>{
        if(savedUser){
            return res.json({error:"already exist"})
        }
    bcrypt.hash(password,12)
    .then(hashed_password=>{
        const user=new User({
            name,
            email,
            password:hashed_password
    
        })
        user.save()
        .then(user=>{res.json({message:"successfully signed up"})})
        .catch(err=>{console.log(err)})
        
    

    })
    
    })
    .catch(err=>{console.log(err)})
})
router.post('/login',(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email})
    .then((user)=>{
        if(!user)
        {
            return res.json({error:"invalid email or password"})
        }

        bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if(doMatch){
                
                const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
                const userWithoutPassword = Object.assign({}, user._doc); // Create a new object without password field
                delete userWithoutPassword.password; // Delete the password field from the object
                res.json({token,user: userWithoutPassword, message:'login successfull'}); // Send the updated object in response
                
            }
            else{
                return res.json({error:"invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})

module.exports=router;