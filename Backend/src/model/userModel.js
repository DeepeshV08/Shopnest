import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"username is required"],
    },
    email:{
        type: String,
        required: [true , "email is required"],
        unique: [true,  "email must be unqiue"]
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum : ["user" ," admin"],
        default: "user"
    },
    verified: {
        type: Boolean,
        default : false
    }
})

const userModel = mongoose.model('users' , userSchema)

export default userModel