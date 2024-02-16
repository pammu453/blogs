import express from 'express'
import { varifyToken } from '../utlis/varifyUser.js'
import { createComment, getPostComment } from '../controllers/comment.contoler.js'

const router = express.Router()

router.post("/create", varifyToken, createComment)
router.get("/getPostComment/:postId", getPostComment)

export default router