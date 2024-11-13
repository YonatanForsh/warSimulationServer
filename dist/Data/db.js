"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialOrgData = exports.connectToMongo = void 0;
const mongoose_1 = require("mongoose");
const connectToMongo = async () => {
    try {
        (0, mongoose_1.connect)(process.env.DB_URL);
        console.log("Connected to mongo");
    }
    catch (error) {
        console.log("Can't connect to database", error);
    }
};
exports.connectToMongo = connectToMongo;
const initialOrgData = async () => {
    try {
    }
    catch (error) {
        console.log("Can't save organization to database", error);
    }
};
exports.initialOrgData = initialOrgData;
