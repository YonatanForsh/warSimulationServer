"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionsToClient = exports.handleConnection = void 0;
const app_1 = require("../app");
const actionServies_1 = __importDefault(require("../services/actionServies"));
const handleConnection = (client) => {
    console.log(`[socket.io] new connection ${client.id}`);
    // actionsToClient()
};
exports.handleConnection = handleConnection;
const actionsToClient = async () => {
    const data = await actionServies_1.default.getActions();
    app_1.io.emit("attacks", data);
};
exports.actionsToClient = actionsToClient;
