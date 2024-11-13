"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const missiles_json_1 = __importDefault(require("../../Data/missiles.json"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const actionScema_1 = __importDefault(require("../models/actionScema"));
const intercept = async (req, res) => {
    const { actionId } = req.body;
    actionScema_1.default.findByIdAndUpdate(actionId, { status: "intercepted" });
};
const sendMessage = async (req, res) => {
    try {
        const { userAttackId, missileName, area } = req.body;
        const time = await missileTime(missileName);
        checking(missileName, area, time);
    }
    catch (error) {
    }
};
const checking = async (missileName, area, time) => {
    try {
        const users = await userSchema_1.default.find({
            "org.name": { $regex: "IDF", $options: "i" },
            "location": area
        });
        for (const user of users) {
            for (const missile of user.org.resources) {
                for (const m of missiles_json_1.default) {
                    if (m.name == missile.name) {
                        if (m.intercepts.includes(missileName)) {
                        }
                    }
                }
            }
        }
    }
    catch (error) {
    }
};
const missileTime = async (missileName) => {
    const missile = missiles_json_1.default.find((m) => m.name == missileName);
    return missile === null || missile === void 0 ? void 0 : missile.speed;
};
exports.default = {
    intercept
};
