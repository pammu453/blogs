import express from 'express'

import { updateUser, deleteUser } from '../controllers/user.controler.js'
import { varifyToken } from '../utlis/varifyUser.js'

const router = express.Router()

router.put("/updateUser/:userId", varifyToken, updateUser)
router.delete("/deleteUser/:userId", varifyToken, deleteUser)

export default router