import exp from "express"
import { connectToMongo, initialOrgData } from "../Data/db"
import  cors from "cors"
import "dotenv/config"
import userController from "./controllers/userController"
import attackController from "./controllers/attackController"
import protectionController from "./controllers/protectionController"


const PORT = process.env.PORT || 2020
const app = exp()
connectToMongo()
initialOrgData()
app.use(exp.json())
app.use(cors())

app.use("/api/users", userController)
app.use("/api/attacks", attackController)
app.use("/api/attacks", protectionController)

app.listen(PORT, () => console.log(`Server is runing! visit "http://localhost:${PORT}"`));

