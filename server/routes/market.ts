import { Request, Response } from "express";
import axios from "axios";
import { MandiService } from "../services/mandiService";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";

export const handleMarketStates = async (req: Request, res: Response) => {
    try {
        const states = await MandiService.getStates();
        return res.json(states);
    } catch (error) {
        return res.json([]);
    }
};

export const handleMarketDistricts = async (req: Request, res: Response) => {
    try {
        const { state } = req.query;
        const districts = await MandiService.getDistricts(state as string);
        return res.json(districts);
    } catch (error) {
        return res.json([]);
    }
};

export const handleMarketMarkets = async (req: Request, res: Response) => {
    try {
        const { state, district } = req.query;
        const markets = await MandiService.getMarkets(state as string, district as string);
        return res.json(markets);
    } catch (error) {
        return res.json([]);
    }
};

export const handleMarketPrices = async (req: Request, res: Response) => {
    try {
        const { state, district, mandi } = req.query;
        const prices = await MandiService.getPrices({
            state: state as string,
            district: district as string,
            mandi: mandi as string
        });
        return res.json(prices);
    } catch (error) {
        return res.json([]); // Absolute fallback
    }
};

export const handleMarketPredict = async (req: Request, res: Response) => {
    try {
        const { crop } = req.params;
        let prediction = null;
        try {
            const response = await axios.post(`${ML_SERVICE_URL}/predict-market`, { crop }, { timeout: 2000 });
            prediction = response.data;
        } catch (mlError) {
            console.warn(`⚠️ [Market] ML Service unreachable, returning mock prediction for ${crop}`);
        }

        if (!prediction) {
            prediction = {
                current_price: 2200,
                forecast: [
                    { day: "Monday", date: "2024-05-20", price: 2210 },
                    { day: "Tuesday", date: "2024-05-21", price: 2235 },
                    { day: "Wednesday", date: "2024-05-22", price: 2220 },
                    { day: "Thursday", date: "2024-05-23", price: 2240 },
                    { day: "Friday", date: "2024-05-24", price: 2260 },
                    { day: "Saturday", date: "2024-05-25", price: 2255 },
                    { day: "Sunday", date: "2024-05-26", price: 2280 }
                ]
            };
        }
        return res.json(prediction);
    } catch (error) {
        return res.json({ current_price: 2200, forecast: [] }); // Absolute fallback
    }
};
