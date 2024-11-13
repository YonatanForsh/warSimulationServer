"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../Data/db");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const userController_1 = __importDefault(require("./controllers/userController"));
const PORT = process.env.PORT || 2020;
const app = (0, express_1.default)();
(0, db_1.connectToMongo)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/users", userController_1.default);
app.listen(PORT, () => console.log(`Server is runing! visit "http://localhost:${PORT}"`));
