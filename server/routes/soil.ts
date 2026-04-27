import { Request, Response } from "express";
import axios from "axios";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";

export const handleSoilAnalyze = async (req: Request, res: Response) => {
    try {
        const { n, p, k, ph, moisture } = req.body;
        const response = await axios.post(`${ML_SERVICE_URL}/analyze-soil`, { n, p, k, ph, moisture });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Soil analysis failed" });
    }
};
