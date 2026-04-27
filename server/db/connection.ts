import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Ensure .env is loaded before MONGODB_URI is accessed
dotenv.config({ path: path.join(process.cwd(), "..", ".env") });

let isDbConnected = false;
export const getDbStatus = () => isDbConnected;

export function connectDB() {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/farmersapp";
    mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 15000,
    }).then(() => {
        isDbConnected = true;
        console.log("✅ [Database] MongoDB Connected Successfully.");
    }).catch((error) => {
        isDbConnected = false;
        console.log("⚠️ [Database] MongoDB Offline: Running in Local Cache mode.");
    });
}
