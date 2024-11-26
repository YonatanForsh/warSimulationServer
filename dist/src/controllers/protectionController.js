"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectionRouter_1 = require("../routes/protectionRouter");
const router = (0, express_1.Router)();
router.post("/", protectionRouter_1.intercept);
exports.default = router;
