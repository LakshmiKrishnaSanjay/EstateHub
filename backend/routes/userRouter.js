const express=require("express")

const isAuth = require("../middlewares/isAuth")
const userController = require("../controllers/userController")

const userRouter=express.Router()

userRouter.post('/register',userController.register)
userRouter.post('/login',userController.login)
userRouter.post('/logout',userController.logout)
module.exports=userRouter