"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attackRouter_1 = require("../routes/attackRouter");
const router = (0, express_1.Router)();
router.post("/", attackRouter_1.shutMissile);
exports.default = router;
