var jwt = require('jsonwebtoken');
const JWT_TOKEN = "test_token";

const fetchuser = (req, res, next)=>{ 
    
//     res.send(JSON.stringify(req.headers));
   const token = req.header("authtoken");
   if(!token){
    res.status(401).json({Error:"Error h token glat h"});
   }
   try{
    const data = jwt.verify(token,JWT_TOKEN);
    req.user = data.user;
    next();
   }catch(error){
res.send(401).json({Message:"koni hoa"});
   }
   
}
module.exports = fetchuser;