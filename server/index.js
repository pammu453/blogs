import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log(error.message);
    });


app.listen(5000, () => {
    console.log("Server is running on port 5000!");
});

app.use("/api/user", userRouter)