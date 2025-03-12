const express=require("express")
const router=require("./routes")


const connect = require("./DB/connect")
const errorhandler = require("./middlewares/errorHandler")
const cookieParser = require("cookie-parser")
const cors =require("cors")

require("dotenv").config()

const app=express()
connect()

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
  }

app.use(cors(corsOptions))
app.use(express.json())

app.use(cookieParser())
app.use("/api/v1",router)

app.use(errorhandler)


app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))