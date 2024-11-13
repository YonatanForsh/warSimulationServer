import exp from "express"
import { connectToMongo } from "../Data/db"
import  cors from "cors"
import "dotenv/config"
import userController from "./controllers/userController"



const PORT = process.env.PORT || 2020
const app = exp()
connectToMongo()
app.use(exp.json())
app.use(cors())

app.use("/api/users", userController)



app.listen(PORT, () => console.log(`Server is runing! visit "http://localhost:${PORT}"`));

