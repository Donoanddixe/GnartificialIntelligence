import SongRequest from "../models/userSongRequest.model.js";

// Create- here we have the post to sumbmit song requests 
// should this be coming from my file upload/download controllers? breaking my brain

export const request = async (req, res) => {
    try {
        const newRequest = await SongRequest.create(req.body)
        res.status(201).json(newRequest)
    }
    catch (err) {
        console.log('There was an error submitting your request', err)
        res.status(400).json(err)
    }
}

// Read probs need this for your library/display? but also, 
// should this be coming from my file upload/download controllers? breaking my brain

// UPdate 
export const updateRequestById = async (req, res, next) => {
    const { id } = req.params
    const options = {
        new: true,
        runValidators: true
    }

    try {
        const updatedRequest = await SongRequest.findByIdAndUpdate(id, req.body, options)
        res.status(200).json(updatedRequest)
    }
    catch (error) {
        res.status(400).json(error)
    }
}
// Delete def need to give users ability to delete their library songs