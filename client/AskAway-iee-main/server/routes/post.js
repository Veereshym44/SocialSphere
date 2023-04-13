const express=require('express')

const router=express.Router()

const mongoose=require('mongoose')
const Ans=mongoose.model("Ans");
const requireLogin =require('../middleware/requireLogin')
const Post=mongoose.model("Post")
router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedby","_id ")
    .then(posts=>
    {
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/allanswers',(req,res)=>{
    Ans.find({})
    .then(ans=>
    {
        res.json({answers})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/mypost',requireLogin,(req,res)=>{
    console.log(req.user);
    Post.find({postedby:req.user._id})
    .populate("postedby","_id name")
    .then(mypost=>{
res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })

})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body}=req.body
    console.log(title)
    console.log(body)
  

    if(!title||!body)
    {
        return res.status(422).json({error:"please add all the fields"});
    }
   const post=new Post({
    title,
    body,
    postedby:req.user
   })
   
   post.save().then(result=>{
    res.json({message:"Successfully Saved"})
   })
   .catch(err=>{
    res.json({error:err})
    console.log(err);
   })
})
module.exports=router