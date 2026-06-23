import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// Router import 
import authRouter from './routes/authRoutes.js'

// Create an instance of express
const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
// routes
app.use('/api/auth' , authRouter)
app.get('/' ,(req,res) => {
    res.send("Helllooo world")
})

export default app