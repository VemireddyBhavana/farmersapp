import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/farmersapp";

export function connectDB() {
    mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
    }).then(() => {
        console.log("✅ [Database] MongoDB Connected Successfully.");
    }).catch((error) => {
        console.log("⚠️ [Database] MongoDB Offline: Running in Local Cache mode.");
    });
}
