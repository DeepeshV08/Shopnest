import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// Router import 
import authRouter from './routes/authRoutes.js'
import  productRouter  from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'
import analyticsRouter from './routes/analyticsRoutes.js'
// Create an instance of express
const app = express()

// middlewares
app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
// routes
app.use('/api/auth' , authRouter)
app.use('/api/products' , productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/payment' , paymentRouter)
app.use('/api/analytics' , analyticsRouter)

app.get('/' ,(req,res) => {
    res.send("Helllooo world")
})
app.use(express.static("/public"))
app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
});

export default app