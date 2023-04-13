
const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const ansSchema=new mongoose.Schema({

    text:String,
    postId:{
        type:ObjectId,
        ref:"Post"
    },
    docId:{
        type:ObjectId,
        ref:"Doctor"
    }
        
})

mongoose.model("Ans",ansSchema)