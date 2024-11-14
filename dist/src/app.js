"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../Data/db");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const userController_1 = __importDefault(require("./controllers/userController"));
const attackController_1 = __importDefault(require("./controllers/attackController"));
const protectionController_1 = __importDefault(require("./controllers/protectionController"));
const actionController_1 = __importDefault(require("./controllers/actionController"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const io_1 = require("./sockets/io");
const PORT = process.env.PORT || 2020;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: "*"
    }
});
exports.io.on('connection', io_1.handleConnection);
// actionsToClient()
(0, db_1.connectToMongo)();
(0, db_1.initialOrgData)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/users", userController_1.default);
app.use("/api/attacks", attackController_1.default);
app.use("/api/protects", protectionController_1.default);
app.use("/api/actions", actionController_1.default);
httpServer.listen(PORT, () => console.log(`Server is runing! visit "http://localhost:${PORT}"`));
