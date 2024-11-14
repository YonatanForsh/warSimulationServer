import exp from "express"
import { connectToMongo, initialOrgData } from "../Data/db"
import  cors from "cors"
import "dotenv/config"
import userController from "./controllers/userController"
import attackController from "./controllers/attackController"
import protectionController from "./controllers/protectionController"
import actionController from "./controllers/actionController"
import { Server, Socket } from "socket.io"
import  http from "http"
import { actionsToClient, handleConnection } from "./sockets/io"
import actionServies from "./services/actionServies"


const PORT = process.env.PORT || 2020
const app = exp()
const httpServer =  http.createServer(app)
export const io = new Server(httpServer, 
    {
        cors: {
            origin: "*",
            methods: "*"
        }
    }
)


io.on('connection', handleConnection)

connectToMongo()
initialOrgData()
app.use(exp.json())
app.use(cors())

app.use("/api/users", userController)
app.use("/api/attacks", attackController)
app.use("/api/protects", protectionController)
app.use("/api/actions", actionController)

httpServer.listen(PORT, () => console.log(`Server is runing! visit "http://localhost:${PORT}"`));

