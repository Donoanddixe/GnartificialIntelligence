import { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI

export const dbConnect = async () => {
    try {
        connect(MONGODB_URI, { dbName: 'loginLecture' })
        console.log(`connected to MongoDB`)
    }
    catch (error) {
        console.log(`DB connection failed: Error --> ${error}`)
    }
}