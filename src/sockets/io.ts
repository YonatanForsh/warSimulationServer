import { Socket } from "socket.io";
import { io } from "../app";
import actionServies from "../services/actionServies";

export const handleConnection = (client: Socket) => {
    console.log(`[socket.io] new connection ${client.id}`);
    // actionsToClient()
};

export const actionsToClient = async () => {
    const data = await actionServies.getActions()
    io.emit("attacks", data)
}
