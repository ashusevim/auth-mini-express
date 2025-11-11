import express, { type Request, type Response } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import bcypt from "bcrypt"
import { users, type User } from "./users.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser());

app.get('/signup', async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All the fields are required"
        })
    }

    const existingUser = users.find((user) => {user.email == email})

    if(existingUser){
        return res.status(400).json({
            message:  "User already exists"
        })
    }

    // saltrounds shows how many times the hash is internally processed
    const saltRound = 10;
    const hashedPassword = await bcypt.hash(password, saltRound)
})

app.get('/', (req: Request, res: Response) => {
    res.send('Auth is running...')  
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})