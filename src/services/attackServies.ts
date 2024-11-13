import { Request, Response } from "express";
import userSchema from "../models/userSchema";
import actionScema from "../models/actionScema";

const shutMissile = async (req: Request, res: Response) => {
    const { user_id, missileName, area } = req.body;
    try {
        updateMissilesAmmount(user_id, missileName)
        createAction(user_id, missileName, area)
        return res.status(200).send('Missile amount updated');
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
    const newAction = new actionScema(
        {
            userAttackId: user_id,
            missile: missileName,
            area: area
        }
    )
    await newAction.save();
}

export default {
    shutMissile
};