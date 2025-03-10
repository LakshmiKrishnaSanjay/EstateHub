const jwt = require("jsonwebtoken");
require('dotenv').config()

const isAuth=((req,res,next)=>{

    
    const {token}=req.cookies

    if(!token){
        throw new Error("Please login.....!!");
       
    }
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user=decoded

    next()
    

})
module.exports=isAuth