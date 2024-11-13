"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intercept = void 0;
const protectionServies_1 = __importDefault(require("../services/protectionServies"));
const intercept = async (req, res) => {
    try {
        protectionServies_1.default.intercept(req, res);
        res.status(200);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};
exports.intercept = intercept;
