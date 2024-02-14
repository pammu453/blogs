import express from 'express'

import { createPost,getPosts } from '../controllers/post.contoler.js'
import { varifyToken } from '../utlis/varifyUser.js'

const router = express.Router()

router.post("/createPost", varifyToken, createPost)
router.get("/getPosts", getPosts)

export default router