import { Request, Response } from "express";
import { PredictionHistory } from "../models/History";

export const handleSaveHistory = async (req: Request, res: Response) => {
    try {
        const { userId, type, inputData, result } = req.body;
        
        if (!userId || !type || !inputData || !result) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newEntry = new PredictionHistory({
            userId,
            type,
            inputData,
            result,
            timestamp: new Date()
        });

        await newEntry.save();
        res.status(201).json({ message: "History saved successfully", id: newEntry._id });
    } catch (error: any) {
        console.error("❌ [History] Save error:", error.message);
        res.status(500).json({ error: "Failed to save history" });
    }
};

export const handleGetHistory = async (req: Request, res: Response) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: "UserId is required" });
        }

        const history = await PredictionHistory.find({ userId: userId as string }).sort({ timestamp: -1 });
        res.json(history);
    } catch (error: any) {
        console.error("❌ [History] Fetch error:", error.message);
        res.status(500).json({ error: "Failed to fetch history" });
    }
};
