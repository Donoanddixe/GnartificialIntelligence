import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnect } from './config/mongoose.config.js'
import router from './routes/user.routes.js'
import cookieParser from 'cookie-parser' // this is to import cookieParser and send cookies to the client. 

const app = express()
app.use(cookieParser(process.env.SECRET_KEY)) // dont forget to use cookieParser
app.use(express.json(), cors({ origin: 'http://localhost:5173', credentials: true }))
app.use('/api', router)
// app.use('/api', () => console.log("I'm in the server."))
dotenv.config()
const PORT = process.env.PORT
dbConnect()

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))