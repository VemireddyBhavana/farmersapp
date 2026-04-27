import { Request, Response } from "express";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";

const upload = multer({ storage: multer.memoryStorage() });
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";

export const handleSoilAnalyze = [
    upload.single("image"),
    async (req: any, res: Response) => {
        try {
            // Handle Image Upload
            if (req.file) {
                const form = new FormData();
                form.append("image", req.file.buffer, {
                    filename: req.file.originalname,
                    contentType: req.file.mimetype,
                });

                const response = await axios.post(`${ML_SERVICE_URL}/analyze-soil-image`, form, {
                    headers: form.getHeaders(),
                    timeout: 5000,
                });
                return res.json(response.data);
            }

            // Handle JSON NPK (Original)
            const { n, p, k, ph, moisture } = req.body;
            if (n !== undefined) {
                const response = await axios.post(`${ML_SERVICE_URL}/analyze-soil`, { n, p, k, ph, moisture });
                return res.json(response.data);
            }

            res.status(400).json({ error: "No image or NPK data provided" });
        } catch (error: any) {
            console.error("❌ [Soil] Analysis error:", error.message);
            res.status(500).json({ error: "Soil analysis failed" });
        }
    }
];
