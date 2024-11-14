import { Request, Response } from "express"
import missilesList from "../../Data/missiles.json"
import userSchema from "../models/userSchema"
import actionScema from "../models/actionScema"


const intercept = async (req: Request, res: Response) => {
    const { action_id, intercept_id } = req.body
    try {
        const action = await actionScema.findById(action_id)
        if (action) {
            const resolt = await shutIntercept(intercept_id, action?.missile)
            if (resolt == true) {
                await actionScema.findByIdAndUpdate(
                    action_id,
                    { status: "intercepted" }
                )
                res.status(200).send("Intercepted successfuly")
            }
        }
    } catch (error) {
        res.status(500).send("Intercepted faild")
    }
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
        for (const user of users) {
            for (const missile of user.org.resources) {
                for (const m of missilesList) {
                    if (m.name == (missile as any).name) {
                        if (m.intercepts.includes(missileName)) {

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

const shutIntercept = async (intercept_id: string, missileName: string) => {
    const user = await userSchema.findById(intercept_id)
    if (user) {
        for (const missile of user.org.resources) {
            const m = missilesList.find((m) => m.name == (missile as any).name)
            if (m?.intercepts.includes(missileName)) {
                await userSchema.findByIdAndUpdate(intercept_id,
                    { $inc: { "org.resource.amount": -1 } }
                )
            }
            return true
        }
    }
    return false
}

export default {
    intercept
}