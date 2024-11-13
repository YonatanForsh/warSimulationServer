import { Schema, Types, Document, model } from "mongoose"

export interface IOrg extends Document {
    name: string
    resources: []
    budget: number
}

const orgSchema = new Schema<IOrg>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    resources: {
        type: [],
        required: true
    },
    budget: {
        type: Number,
    }
})

export default model<IOrg>("organization", orgSchema)
