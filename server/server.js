const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
// const path=require('path');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(()=>{
    console.log('CONNECTED');
}).catch((err)=>{
    console.log(err);
});
app.listen(process.env.PORT,()=>{
    console.log('SERVER STARTED');
});