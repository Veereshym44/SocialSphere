const mongoose=require('mongoose');
const doctorSchema=new mongoose.Schema({
name:{
type:String,
required:true
},
email:{
type:String,
required:true
},
password:{
type:String,
required:true
},
docID:{
type:String,
required:true
}
})

mongoose.model("Doctor",doctorSchema);