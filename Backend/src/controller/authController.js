import userModel from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import sendEmail from '../utils/sendEmail.js'

const generateToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, { expiresIn : '7d'})
}
export async function registerController(req,res) {

    const {email, name , password} = req.body

    const isExisting = await userModel.findOne({email})

    if(isExisting){
        return res.status(40).json({
            message: "user already exists",
            success: false
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email,
        password: hashPassword,
        name
    })
    
    if(user){
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        const message = `
        Welcome to ShopNest, ${name} Thank you for registering with us. We are excited to have you,
        Ypur OTP for ShopNest registration is: ${otp}
        `

        await sendEmail(email , 'Welcome to ShopNest - Your OPT for registartion' , message)

        res.status(201).json({
            message: "User registered succesfully. Please check your email for the OTP",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    }else{
        res.status(400).json({
            message: "Invalid user data"
        })
    }
}

export async function loginController(req, res) {
    const {email , password} = req.body

    const user = await userModel.findOne({email})

    if(user &&(await bcrypt.compare(password, user.password))){
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    }else{
        return res.status(400).sjon({
            message: "Invalid email or password"
        })
    }
}

export async function getUserController(req, res){

    try{
    const user = await userModel.find({}).select("-password")
    res.json(user)
    }catch(err){
        res.status(500).json({message: "Server error"})
    }
}
export async function logoutController(req, res) {

}