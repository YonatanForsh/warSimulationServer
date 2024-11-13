import { Schema, Types, Document, model } from "mongoose"

export interface IUser extends Document {
    username: string
    password: string
    org: string
    location?: string
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    org: {
        type: String,
    },
    location: {
        type: String,
        default: null
    }
})

export default model<IUser>("User", userSchema)
