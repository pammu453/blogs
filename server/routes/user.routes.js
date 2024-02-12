import express from 'express'

import { updateUser } from '../controllers/user.controler.js'
import { varifyToken } from '../utlis/varifyUser.js'

const router = express.Router()

router.put("/updateUser/:userId", varifyToken, updateUser)

export default router