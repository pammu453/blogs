import Post from "../models/post.model.js"
import { errorHandler } from "../utlis/error.js"

export const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create a post"))
    }

    if (await Post.findOne({ title: req.body.title })) {
        return next(errorHandler(403, "Post exist with this title"))
    }

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(403, "Please provide all the fields"))
    }

    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "")

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.userId
    })

    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}