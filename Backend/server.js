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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...');
  });
}