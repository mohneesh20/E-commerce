const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
  try {
    await User.create(req.body,(err,result)=>{
    if(err){
      return res.status(500).json(err);
    }
    res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    // console.log(req.body.email);
    const user = await User.findOne({ username: req.body.username });
    if(!user){
     return res.status(400).json("WRONG CREDENTIALS!");
    }
    const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if(OriginalPassword!==req.body.password){
      return res.status(401).json("INCORRECT PASSWORD!");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );
    const { password, ...others } = user._doc;
    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;