import { Request, Response } from "express";
import actionScema from "../models/actionScema";

const getActions = async () => {
    try {
        const allActions = await actionScema.find().lean();
        return allActions;
        // res.status(200).json(allActions);
    } catch (error) {
        return "There aren't actions"
        // res.status(500).json({ message: "User creation failed", error });
    }
}

export default {
    getActions
}