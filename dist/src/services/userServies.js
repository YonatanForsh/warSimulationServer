"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.createUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcrypt_1 = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = async (req, res) => {
    try {
        const { username, password, org, location } = req.body;
        const hashPass = await bcrypt_1.default.hash(password, 10);
        const newUser = new userSchema_1.default({ username, password: hashPass, org, location });
        await newUser.save();
        console.log("User created successfuly!");
        res.status(201).json({ message: "User created successfully!" });
    }
    catch (error) {
        console.log("Can't create user", error);
        res.status(500).json({ message: "User creation failed", error });
    }
};
exports.createUser = createUser;
const userLogin = async (user) => {
    try {
        const userFromDatabase = await userSchema_1.default.findOne({ username: user.username }).lean();
        if (!userFromDatabase)
            throw new Error("user not found");
        const match = await (0, bcrypt_1.compare)(user.password, userFromDatabase.password);
        if (!match)
            throw new Error("wrong password");
        const token = await jsonwebtoken_1.default.sign({
            user_id: userFromDatabase._id,
            username: userFromDatabase.username,
            org: userFromDatabase.org,
            location: userFromDatabase.location
        }, process.env.JWT_SECRET, {
            expiresIn: "10m"
        });
        return { ...userFromDatabase, token, password: "*******" };
    }
    catch (err) {
        throw err;
    }
};
exports.userLogin = userLogin;
