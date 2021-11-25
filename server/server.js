const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const morgan=require('morgan');
const helmet=require('helmet');
require('dotenv').config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const app=express();
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('CONNECTED');
}).catch((err)=>{
    console.log(err);
});
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.listen(process.env.PORT,()=>{
    console.log('SERVER STARTED');
});