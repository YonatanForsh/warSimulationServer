import { connect } from "mongoose";

export const connectToMongo = async () => {
    try {
        connect(process.env.DB_URL as string)
        console.log("Connected to mongo");   
    } catch (error) {
        console.log("Can't connect to database", error);      
    }
}

export const initialOrgData = async () => {
    try {
        
    } catch (error) {
        console.log("Can't save organization to database", error);      
    }
}
