import { Schema, Document, model } from "mongoose"

export interface IAction extends Document {
    userAttackId: string
    missile: string
    area: string
    status: string
}

const actionSchema = new Schema<IAction>({
    userAttackId: {
        type: String,
        required: true
    },
    missile: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "inAir"
    }
});

export default model<IAction>("Action", actionSchema)
