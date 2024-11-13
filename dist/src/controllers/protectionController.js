"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = require("../routes/userRouter");
const router = (0, express_1.Router)();
router.post("/login", userRouter_1.login);
router.post("/register", userRouter_1.register);
exports.default = router;
