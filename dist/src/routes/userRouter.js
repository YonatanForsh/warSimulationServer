"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const userServies_1 = require("../services/userServies");
const login = async (req, res) => {
    try {
        const loggedUser = await (0, userServies_1.userLogin)(req.body);
        res.status(200).json(loggedUser);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        await (0, userServies_1.createUser)(req, res);
    }
    catch (error) {
        console.log("Can't create user", error);
    }
};
exports.register = register;
