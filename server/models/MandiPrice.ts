import mongoose from "mongoose";

const MandiPriceSchema = new mongoose.Schema({
    crop: { type: String, required: true },
    mandi: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    rate: { type: Number, required: true },
    trend: { type: String, enum: ["up", "down", "neutral"], default: "neutral" },
    change: { type: String, default: "0" },
    date: { type: Date, default: Date.now }
});

export const MandiPrice = mongoose.models.MandiPrice || mongoose.model("MandiPrice", MandiPriceSchema);
