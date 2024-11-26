"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../models/userSchema"));
const actionScema_1 = __importDefault(require("../models/actionScema"));
const missiles_json_1 = __importDefault(require("../../Data/missiles.json"));
const app_1 = require("../app");
const shutMissile = async (req, res) => {
    const { user_id, missileName, area } = req.body;
    try {
        await updateMissilesAmmount(user_id, missileName);
        const newAction = await createAction(user_id, missileName, area);
        emitToClient();
        return res.status(200).send(newAction);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
};
const updateMissilesAmmount = async (user_id, missileName) => {
    const result = await userSchema_1.default.updateOne({ _id: user_id, "org.resources.name": missileName }, { $inc: { "org.resources.$.amount": -1 } });
    if (result.modifiedCount === 0) {
        return 'Missile not found or no update made';
    }
    return result;
};
const createAction = async (user_id, missileName, area) => {
    let time = await missileTime(missileName);
    if (typeof (time) == "number") {
        time = time * 1000;
    }
    const speed = missiles_json_1.default.find((m) => m.name == missileName);
    const newAction = new actionScema_1.default({
        userAttackId: user_id,
        missile: missileName,
        speed: speed === null || speed === void 0 ? void 0 : speed.speed,
        area: area,
        status: "inAir"
    });
    await newAction.save();
    setTimeout(async () => {
        await actionScema_1.default.updateOne({ _id: newAction._id }, { $set: { status: "Fall" } });
    }, time);
};
const missileTime = async (missileName) => {
    const missile = missiles_json_1.default.find((m) => m.name == missileName);
    return missile === null || missile === void 0 ? void 0 : missile.speed;
};
const emitToClient = () => {
    // io.on("newAttack", ({socket, data}) => {
    app_1.io.emit("returnAttack");
};
exports.default = {
    shutMissile
};
