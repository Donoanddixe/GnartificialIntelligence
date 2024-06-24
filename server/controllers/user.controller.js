import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const userToken = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.SECRET_KEY
        )
        console.log(userToken)
        res.cookie('userToken', userToken)
        res.status(201).json(newUser)
    }
    catch (err) {
        console.log('ERROR', err)
        res.status(400).json(err)
    }
}

export const login = async (req, res) => {
    console.log("I made it into the controller function.")
    // checks if user exists via email 
    const { email, password } = req.body
    const potentialUser = await User.findOne({ email: email })
    // findOne is suuuuper important here. If you want to check against multiple values, you would need to just use . find()
    // you are on W7S2 25 min in
    if (!potentialUser) {
        console.log('invalid user return')
        return res.status(404).json({ message: 'user not found' })
    }
    //  if we get here, we know there is a user that mathecs that email
    const isPasswordCorrect = await bcrypt.compare(password, potentialUser.password)
    if (!isPasswordCorrect) {
        console.log('invalid credentials return')
        return res.status(400).json({ message: 'invalid credentials' })
    }
    // if we get here we know that the user exists and the passwords match
    const userToken = jwt.sign(
        { userId: potentialUser._id, username: potentialUser.username },
        process.env.SECRET_KEY
    )
    console.log("user's todken", userToken)
    res.cookie('userToken', userToken, { httpOnly: true })
    res.status(201).json(potentialUser)
}

export const getLoggedInUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

export const logout = async (req, res) => {
    res.clearCookie('userToken')
    return res.status(200).json({ message: 'Successfully logged out' })
}