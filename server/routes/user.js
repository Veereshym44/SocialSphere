const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")
const User = mongoose.model("User")

router.get('/user/:id',(req, res) => {
    // Route handler function

    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         Post.find({postedby:req.params.id})
         .populate("postedby","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
  });
  router.put('/follow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{
            followers:req.user._id
        }
    },{
        new:true
    },(err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{
                followings:req.body.followId
            }
        },{
            new:true
        }
        ).select("-password").then(result=>{
            return res.json(result)
        })
        .catch(err=>{
            return res.status(422).json({err})
        })
        
    })

   
})
router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{
            followers:req.user._id
        }
    },{
        new:true
    },(err,result)=>{
        if(err)
        {
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{
                followings:req.body.unfollowId
            }
        },{
            new:true
        }
        ).select("-password")
        .then(result=>{
            return res.json(result)
        })
        .catch(err=>{
            return res.status(422).json({err})
        })
        
    })

   
})
module.exports = router