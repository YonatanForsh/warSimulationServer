import { Schema, Types, Document, model } from "mongoose"

export interface IOrg extends Document {
    name: string
    resource: []
    budget: number
}

const userSchema = new Schema<IOrg>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    resource: {
        type: [],
        required: true
    },
    budget: {
        type: Number,
    }
})

export default model<IOrg>("organization", userSchema)
