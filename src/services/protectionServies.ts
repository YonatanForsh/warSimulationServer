import { Request, Response } from "express"
import missilesList from "../../Data/missiles.json"
import userSchema from "../models/userSchema"
import actionScema from "../models/actionScema"

const intercept = async (req: Request, res: Response) => {
    const { actionId } = req.body
    actionScema.findByIdAndUpdate(
        actionId,
        { status: "intercepted" }
    )
}

const sendMessage = async (req: Request, res: Response) => {
    try {
        const { userAttackId, missileName, area } = req.body
        const time = await missileTime(missileName)
        checking(missileName, area, time)
    } catch (error) {

    }
}


const checking = async (missileName: string, area: string, time: number | undefined) => {
    try {
        const users = await userSchema.find({
            "org.name": { $regex: "IDF", $options: "i" },
            "location": area
        })
        for (const user of users){
            for (const missile of user.org.resources){
                for (const m of missilesList){
                    if (m.name == (missile as any).name){
                        if (m.intercepts.includes(missileName)){

                        }
                    }
                }
            }
        }
    } catch (error) {

    }
};


const missileTime = async (missileName: string) => {
    const missile = missilesList.find((m) => m.name == missileName)
    return missile?.speed
}

export default {
    intercept
}