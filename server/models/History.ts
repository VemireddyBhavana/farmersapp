import mongoose from "mongoose";

const PredictionHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ["market", "disease", "soil", "yield"], required: true },
    inputData: { type: Object, required: true },
    result: { type: Object, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const PredictionHistory = mongoose.model("PredictionHistory", PredictionHistorySchema);
