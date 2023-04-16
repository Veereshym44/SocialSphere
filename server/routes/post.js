const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requireLogin =require('../middleware/requireLogin')
const Post=mongoose.model("Post")
router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedby","__id name")
    .populate("comments.postedby","_id name")
    .then(posts=>
    {
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/mypost', requireLogin, async (req, res) => {
    try {
      const mypost = await Post.find({ postedby: req.user._id }).populate('postedby', '_id name');
      res.json({ mypost });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,photo}=req.body
    

    if(!title||!body||!photo)
    {
        return res.status(422).json({error:"please add all the fields"});
    }
   const post=new Post({
    title,
    body,
    photo,
    postedby:req.user
   })
   
   post.save().then(result=>{
    res.json({message:"Successfully Saved"})
   })
   .catch(err=>{
    res.json({error:err})
    console.log(err)
    
   })
})
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{
            likes:req.user._id
        }
    },{
        new:true
    })
    .populate("comments.postedby","_id name")
    .populate("postedby","__id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{
            likes:req.user._id
        }
    },{
        new:true
    })
    .populate("comments.postedby","_id name")
    .populate("postedby","__id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.put('/comment',requireLogin,(req,res)=>{
    const comment={
    text:req.body.text,
    postedby:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{
            comments:comment
        }
    },{
        new:true
    }).populate("comments.postedby","_id name")
    .populate("postedby","__id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedby","_id")
    .exec((err,post)=>{
        if(err||!post)
       return res.status(422).json({error:err})
        if(post)
        {
            if(post.postedby._id.toString()===req.user._id.toString())
            post.remove()
            .then(result=>{
                res.json(result)
                
            })
            .catch(err=>{
                console.log(err);
            })
            
               
            
            
        }
        
    })
})
module.exports=router