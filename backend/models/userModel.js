const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        minLength: [3, "Length less than 3"],
        maxLength: [20, "Length greater than 20"],
    },
    password:{
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true // Fix incorrect key
    }
},{
    timestamps:true
})

const User= mongoose.model('User',userSchema)
module.exports=User