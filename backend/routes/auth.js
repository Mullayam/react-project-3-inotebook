const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_TOKEN = "test_token";
const fetchUser = require('../middleware/fetchUser');
//cretate a user ussing post api/auth
router.post(
  "/CreateUser",
  [
    body("name", "custom name error").isLength({ min: 3 }),
    body("email", "custom email err").isEmail(),
    body("password", "custom pass err").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success:false, message: errors.array() });
    }
    try {
      let user = await User.findOne({email: req.body.email });
      if (user)
        return res
          .status(400)
          .json({ message: "User With this email is already exist" });
        const salt = await bcrypt.genSalt(10);        
        const secpass = await bcrypt.hash(req.body.password, salt);
          
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
        //   .then(user => res.json(user))
        //   .catch((error)=>{
        //     res.json({error: 'Some Date is already Exist', message: error.message})
        //   })
      });
      const data ={
                user:{
                id:user.id
                     }
                   }
      const authToken= jwt.sign(data,JWT_TOKEN);
    
      return res.json({ Success:true,message: "Cool Bro-User Added",auth_token:authToken });
    } catch (error) {
      console.error(error.message);
     return  res.status(500).send("Error Occured");
    }
  }
)
//user login
router.post(
    "/Login",
    [      
      body("email", "custom email err").isEmail(),
      body("password", "Password Cannot be Blank").exists(),
    ], async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
         return   res.status(400).json({Error_Message:errors.array});
        }
        const {email,password} = req.body
        try{
            let user = await User.findOne({email});
            if(!user){
          return  res.status(404).json({Success:false,Error_Message:"User Not Found"});                
            }
         const passVerify = await bcrypt.compare(password, user.password);
         if(!passVerify){
           return res.status(400).json({Success:false,Error_Message:"Please Enter correct Password"}); 
         }
         const payload ={
            user:{
                id:user.id
            }
         }
         const authToken= jwt.sign(payload,JWT_TOKEN);
         
       res.json({ Success:true,auth_token: authToken });

        }catch(error){
             res.status(500).json({Success:false,Error:"Internal Server Error"});
        }

    }
)
//user deitals
router.post("/GetUser",fetchUser, async (req, res)=>{
try{
userId=req.user.id;
const user = await User.findById(userId).select("-password")
res.send(user)
}catch(error){
console.error
res.status(500)
}
  }
)
module.exports = router;
