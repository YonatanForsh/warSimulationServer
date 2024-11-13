import { Schema, Types, Document, model } from "mongoose"
import { IOrg } from "./orgModel"

export interface IUser extends Document {
    username: string
    password: string
    org: IOrg
    location?: string
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    org: {
        type: {
            name: String,
            resources: [],
            budget: Number
        },
        required: true
    },
    location: {
        type: String,
        default: null
    }
})

export default model<IUser>("User", userSchema)
