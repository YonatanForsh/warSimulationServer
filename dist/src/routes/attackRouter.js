"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutMissile = void 0;
const attackServies_1 = __importDefault(require("../services/attackServies"));
const shutMissile = async (req, res) => {
    try {
        attackServies_1.default.shutMissile(req, res);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};
exports.shutMissile = shutMissile;
