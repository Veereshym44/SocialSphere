const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
require('dotenv').config
const app=express()
const PORT=5000;
const MONGO_URI=process.env.MONGO_URI
mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected',()=>{
    console.log("success");
})
mongoose.connection.on('error',(err)=>{
    console.log(err);
})
app.use(express.static("public"));
app.use(express.json())
app.use(cors())
require('./models/user')
require('./models/post')
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT,()=>{
    console.log("server");
})