import { config } from 'dotenv'
config()
import app from './src/app.js'
import connectToDB from './src/config/db.js'


// Database connected
connectToDB()

const PORT = process.env.PORT || 8000

// Server start karna
app.listen(PORT, () => {
    console.log("Server is running at port 3000")
})