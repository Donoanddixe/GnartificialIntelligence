import { Schema, model } from "mongoose"


const SongRequestSchema = new Schema({
    style: {
        type: String,
        required: [true, 'A song style is required'],
        maxLength: [50, 'Song Style can be a maximum of 50 characters']
    },
    prompts: {
        type: String,
        required: [true, 'Song prompt required'],
        maxLength: [300, 'Song prompt can be a maximum of 300 characters']
    },
    requests: {
        type: String,
        maxLength: [300, 'Additional requests can be a maximum of 300 characters']

    }
}, { timestamps: true })

const SongRequest = model('SongRequest', SongRequestSchema)
export default SongRequest
