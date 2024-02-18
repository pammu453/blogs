import express from 'express'
import { varifyToken } from '../utlis/varifyUser.js'
import { createComment, getPostComment, likeComment } from '../controllers/comment.contoler.js'

const router = express.Router()

router.post("/create", varifyToken, createComment)
router.get("/getPostComment/:postId", getPostComment)
router.put("/likeComment/:commentId", varifyToken, likeComment)

export default router