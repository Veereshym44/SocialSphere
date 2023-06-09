require('dotenv').config();
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const path = require('path')
const app=express();
const PORT=5000;



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log("success");
});

mongoose.connection.on('error',(err)=>{
    console.log(err);
});
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(cors());
require('./models/user');
require('./models/post');
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
app.listen(PORT,()=>{
    console.log("server");
});
