"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actionScema_1 = __importDefault(require("../models/actionScema"));
const getActions = async () => {
    try {
        const allActions = await actionScema_1.default.find().lean();
        return allActions;
        // res.status(200).json(allActions);
    }
    catch (error) {
        return "There aren't actions";
        // res.status(500).json({ message: "User creation failed", error });
    }
};
exports.default = {
    getActions
};
