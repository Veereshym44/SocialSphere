const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const app=express()
const PORT=5000;
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
const {MONGO_URI}=require('./key')
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
require('./models/user')
require('./models/post')
require('./models/ans')
require('./models/doctor')
app.use(express.static("public"));
app.use(express.json())
app.use(cors())


app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.all("*",(req,res)=>{
    res.send({"message":"page not found"})
})
app.listen(PORT,()=>{
    console.log("server");
})