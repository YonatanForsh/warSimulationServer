"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    resource: {
        type: [],
        required: true
    },
    budget: {
        type: Number,
    }
});
exports.default = (0, mongoose_1.model)("organization", userSchema);
