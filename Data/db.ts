import { connect } from "mongoose";
import organizationList from "./organization.json";
import { IOrg } from "../src/models/orgModel";
import orgSchema from "../src/models/orgModel";

export const connectToMongo = async () => {
    try {
        connect(process.env.DB_URL as string)
        console.log("Connected to mongo");
    } catch (error) {
        console.log("Can't connect to database", error);
    }
}

export const initialOrgData = async () => {
    if (!orgSchema) {
        try {
            for (const org of organizationList) {
                saveOrgData(org as any)
            }
        } catch (error) {
            console.log("Can't save organization to database", error);
        }
    }
}

export const saveOrgData = async (org: IOrg) => {
    try {
        const newOrg = new orgSchema({ name: org.name, resource: org.resources, budget: org.budget })
        await newOrg.save()
    } catch (error) {
        console.log("Cant saveorg data", error);
    }
}
