import { Router } from "express"
import * as userController from "../controllers/user.controller.js"
import * as songRequestController from "../controllers/userSongRequest.controller.js"

const router = Router()

// const del = (req, res) => {
//     console.log("look", req.body)
//     res.status(33).json('hello')
// }
// handy trick to dig into your errors
router.post('/request', songRequestController.request)
router.put('/request/:id', songRequestController.updateRequestById)

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/get_logged_in_user/:id', userController.getLoggedInUser)
router.post('/logout', userController.logout)

export default router

