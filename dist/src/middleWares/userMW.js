"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(403).json({ err: "Token must be provided" });
            return;
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json(error);
    }
};
exports.verifyUser = verifyUser;
