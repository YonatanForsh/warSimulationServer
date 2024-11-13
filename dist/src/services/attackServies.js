"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../models/userSchema"));
const actionScema_1 = __importDefault(require("../models/actionScema"));
const missiles_json_1 = __importDefault(require("../../Data/missiles.json"));
const shutMissile = async (req, res) => {
    const { user_id, missileName, area } = req.body;
    try {
        await updateMissilesAmmount(user_id, missileName);
        await createAction(user_id, missileName, area);
        return res.status(200).send('Missile amount updated');
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
    console.log(time);
    const newAction = new actionScema_1.default({
        userAttackId: user_id,
        missile: missileName,
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
exports.default = {
    shutMissile
};
