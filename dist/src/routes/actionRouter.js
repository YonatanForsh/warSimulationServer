"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActions = void 0;
const actionServies_1 = __importDefault(require("../services/actionServies"));
const getActions = async (req, res) => {
    try {
        const resolt = await actionServies_1.default.getActions();
        console.log(resolt);
        res.status(200).send(resolt);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};
exports.getActions = getActions;
