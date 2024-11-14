"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveOrgData = exports.initialOrgData = exports.connectToMongo = void 0;
const mongoose_1 = require("mongoose");
const organization_json_1 = __importDefault(require("./organization.json"));
const orgModel_1 = __importDefault(require("../src/models/orgModel"));
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
    if (!orgModel_1.default) {
        try {
            for (const org of organization_json_1.default) {
                (0, exports.saveOrgData)(org);
            }
        }
        catch (error) {
            console.log("Can't save organization to database", error);
        }
    }
};
exports.initialOrgData = initialOrgData;
const saveOrgData = async (org) => {
    try {
        const newOrg = new orgModel_1.default({ name: org.name, resource: org.resources, budget: org.budget });
        await newOrg.save();
    }
    catch (error) {
        console.log("Cant saveorg data", error);
    }
};
exports.saveOrgData = saveOrgData;
