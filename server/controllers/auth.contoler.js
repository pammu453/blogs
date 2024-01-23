import bcrypt from 'bcryptjs'
import User from "../models/user.model.js"
import { errorHandler } from '../utlis/error.js'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(errorHandler(400, "All fields are required"))
    }

    const oldUserName = await User.findOne({ username })
    if (oldUserName) {
        next(errorHandler(400, "User already exist with username!"))
    }
    const oldUserEmail = await User.findOne({ email })

    if (oldUserEmail) {
        next(errorHandler(400, "User already exist with email!"))
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.json("SignUp succefull")
    } catch (error) {
        next(error)
    }
}
