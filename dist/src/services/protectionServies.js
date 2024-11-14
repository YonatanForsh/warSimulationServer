"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const missiles_json_1 = __importDefault(require("../../Data/missiles.json"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const actionScema_1 = __importDefault(require("../models/actionScema"));
const intercept = async (req, res) => {
    const { action_id, intercept_id } = req.body;
    try {
        const action = await actionScema_1.default.findById(action_id);
        if (action) {
            const resolt = await shutIntercept(intercept_id, action === null || action === void 0 ? void 0 : action.missile);
            if (resolt == true) {
                await actionScema_1.default.findByIdAndUpdate(action_id, { status: "intercepted" });
                res.status(200).send("Intercepted successfuly");
            }
        }
    }
    catch (error) {
        res.status(500).send("Intercepted faild");
    }
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
const shutIntercept = async (intercept_id, missileName) => {
    const user = await userSchema_1.default.findById(intercept_id);
    if (user) {
        for (const missile of user.org.resources) {
            const m = missiles_json_1.default.find((m) => m.name == missile.name);
            if (m === null || m === void 0 ? void 0 : m.intercepts.includes(missileName)) {
                await userSchema_1.default.findByIdAndUpdate(intercept_id, { $inc: { "org.resource.amount": -1 } });
            }
            return true;
        }
    }
    return false;
};
exports.default = {
    intercept
};
