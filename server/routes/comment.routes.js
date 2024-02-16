import express from 'express'
import { varifyToken } from '../utlis/varifyUser.js'
import { createComment } from '../controllers/comment.contoler.js'

const router = express.Router()

router.post("/create", varifyToken, createComment)

export default router