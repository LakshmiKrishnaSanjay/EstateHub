const express=require("express")
const router=require("./routes")


const connect = require("./DB/connect")
const errorhandler = require("./middlewares/errorHandler")
const cookieParser = require("cookie-parser")

require("dotenv").config()

const app=express()
connect()
app.use(express.json())

app.use(cookieParser())
app.use("/api/v1",router)

app.use(errorhandler)


app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))