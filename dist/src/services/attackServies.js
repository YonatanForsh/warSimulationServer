"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../models/userSchema"));
const actionScema_1 = __importDefault(require("../models/actionScema"));
const shutMissile = async (req, res) => {
    const { user_id, missileName, area } = req.body;
    try {
        updateMissilesAmmount(user_id, missileName);
        createAction(user_id, missileName, area);
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
    const newAction = new actionScema_1.default({
        userAttackId: user_id,
        missile: missileName,
        area: area
    });
    await newAction.save();
};
exports.default = {
    shutMissile
};
