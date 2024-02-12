import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utlis/error.js"
import User from '../models/user.model.js'

export const updateUser = async (req, res, next) => {
    if (req.user.userId !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update this user"))
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, "Password must be at least 6 characters"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    if (req.body.username) {
        if (await User.findOne({username:req.body.username})) {
            return next(errorHandler(400, "User already exist with this username"))
        }
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, "Username must be at least 7 to 20 characters"))
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Username must not contain space"))
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username must be lowerase"))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "Username only contain letter and numbers"))
        }
    }
    if (req.body.email) {
        if (await User.findOne({email:req.body.email})) {
            return next(errorHandler(400, "User already exist with this email"))
        }
        if (!req.body.email.match(/^[a-zA-Z0-9._%+-]+@gmail.com$/)) {
            return next(errorHandler(400, "Enter valid gmail"))
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
        }, { new: true })
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
