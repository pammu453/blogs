import express from 'express'

import { updateUser, deleteUser , signOutUser} from '../controllers/user.controler.js'
import { varifyToken } from '../utlis/varifyUser.js'

const router = express.Router()

router.put("/updateUser/:userId", varifyToken, updateUser)
router.delete("/deleteUser/:userId", varifyToken, deleteUser)
router.post("/signOutUser", signOutUser)

export default router