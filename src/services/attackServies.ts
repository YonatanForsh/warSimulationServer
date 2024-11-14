import { Request, Response } from "express";
import userSchema from "../models/userSchema";
import actionScema, { IAction } from "../models/actionScema";
import missilesList from "../../Data/missiles.json"
import { io } from "../app";
import { Socket } from "socket.io";
import { Client } from "socket.io/dist/client";



const shutMissile = async (req: Request, res: Response) => {
    const { user_id, missileName, area } = req.body;
    try {
        await updateMissilesAmmount(user_id, missileName)
        const newAction = await createAction(user_id, missileName, area)
        emitToClient()
        return res.status(200).send(newAction);
    } catch (err) {
        return res.status(500).send('Server error');
    }
};

const updateMissilesAmmount = async (user_id: string, missileName: string) => {
    const result = await userSchema.updateOne(
        { _id: user_id, "org.resources.name": missileName },
        { $inc: { "org.resources.$.amount": -1 } }
    );
    if (result.modifiedCount === 0) {
        return 'Missile not found or no update made';
    }
    return result
}

const createAction = async (user_id: string, missileName: string, area: string) => {
    let time = await missileTime(missileName)
    if (typeof (time) == "number") {
        time = time * 1000
    }
    const speed = missilesList.find((m) => m.name == missileName)
    const newAction = new actionScema({
        userAttackId: user_id,
        missile: missileName,
        speed: speed?.speed,
        area: area,
        status: "inAir"
    });
    await newAction.save();
    setTimeout(async () => {
        await actionScema.updateOne(
            { _id: newAction._id },
            { $set: { status: "Fall" } }
        );
    }, time);
}

const missileTime = async (missileName: string) => {
    const missile = missilesList.find((m) => m.name == missileName)
    return missile?.speed
}

const emitToClient = () => {
    // io.on("newAttack", ({socket, data}) => {
        io.emit("returnAttack")
    }

export default {
    shutMissile
};