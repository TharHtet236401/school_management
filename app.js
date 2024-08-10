import express from "express"
import connectToMongoDB from "../core/db/connectMongoDB.js"
import dotenv from "dotenv"
dotenv.config()



const app = express()
app.use(express.json())


import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import classRouter from "./routes/class.routes.js"
import studentRouter from "./routes/student.routes.js"

app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/class",classRouter)
app.use("/api/student",studentRouter)



app.get("*",(req,res)=>{
    res.status(404).json({con:false,message:"Page not found"})
})

app.listen(3000, () => {
    connectToMongoDB()

    console.log("Server is running on port 3000")
})