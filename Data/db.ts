import { connect } from "mongoose";

export const connectToMongo = async () => {
    try {
        connect(process.env.DB_URL as string)
        console.log("Connected to mongo");   
    } catch (error) {
        console.log("Cant connect to database", error);      
    }
}