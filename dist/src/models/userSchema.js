"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    org: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: null
    }
});
exports.default = (0, mongoose_1.model)("User", userSchema);
