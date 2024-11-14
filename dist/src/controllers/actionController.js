"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actionRouter_1 = require("../routes/actionRouter");
const router = (0, express_1.Router)();
router.get("/", actionRouter_1.getActions);
exports.default = router;
