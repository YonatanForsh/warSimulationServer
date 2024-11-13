"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const actionSchema = new mongoose_1.Schema({
    userAttackId: {
        type: String,
        required: true
    },
    missile: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "inAir"
    }
});
exports.default = (0, mongoose_1.model)("Action", actionSchema);
