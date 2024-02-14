import express from 'express'

import { createPost } from '../controllers/post.contoler.js'
import { varifyToken } from '../utlis/varifyUser.js'

const router = express.Router()

router.post("/createPost", varifyToken, createPost)

export default router