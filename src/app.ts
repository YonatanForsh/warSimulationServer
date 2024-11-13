import exp from "express"
import { connectToMongo } from "../Data/db"
import  cors from "cors"

const PORT = process.env.PORT || 2020
const app = exp()
connectToMongo()
app.use(exp.json())
app.use(cors())



app.listen(PORT, () => console.log(`Server is runing! visit "http://localhost:${PORT}"`));

