const express=require('express')
const router=express.Router()
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const mongoose=require('mongoose')
const requireLogin=require('../middleware/requireLogin')
const User=mongoose.model("User");
const Ans=mongoose.model("Ans");
const Doctor=mongoose.model("Doctor");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const{JWT_SECRET}=require('../key')

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
router.post('/doc-signup',(req,res)=>{
    const {name,email,password,docID}=req.body
    if(!email||!name||!password||!docID)
    return res.status(422).json({error:"fill all entries"})
    Doctor.findOne({email})
    .then((savedUser)=>{
        if(savedUser){
            return res.json({error:"already exist"})
        }
    bcrypt.hash(password,12)
    .then(hashed_password=>{
        const doctor=new Doctor({
            name,
            email,
            password:hashed_password,
            docID
    
        })
        doctor.save()
        .then(doctor=>{res.json({message:"successfully signed up"})})
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
                
                const token=jwt.sign({_id:user._id},JWT_SECRET)
                const{_id,name,email}=user;
                res.json({token,user:{_id,name,email},message:'login successfull'});
                
                
            }
            else{
                return res.json({error:"inavlid email or password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})
router.post('/doc-login',(req,res)=>{
    const {email,password}=req.body;
    Doctor.findOne({email})
    .then((doctor)=>{
        if(!doctor)
        {
            return res.json({error:"invalid email or password"})
        }

        bcrypt.compare(password,doctor.password)
        .then(doMatch=>{
            if(doMatch){
                
                const token=jwt.sign({_id:doctor._id},JWT_SECRET)
                const{_id,name,email}=doctor;
                res.json({token,doctor:{_id,name,email},message:'login successfull'});
                
                
            }
            else{
                return res.json({error:"inavlid email or password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})

router.post('/answers',(req,res)=>{
    const {text,postId,docId}=req.body;
   console.log(req.body);
    
   if(!text||!postId||!docId)
   {
return res.status(404).json({"message":"error"})
   }
   const ans=new Ans({
text,
  postId,
    docId

})
ans.save()
.then(ans=>{res.json({message:"successfully signed up"})})
.catch(err=>{console.log(err)})


    // .populate("postId","_id")
    // .populate("docId","_id")
    // .exec((err,result)=>{
    //     if(err)
    //     {
    //         return res.status(422).json({error:err})
    //     }
    //     else{
    //         res.json(result)
    //     }
    // })
})
module.exports=router;