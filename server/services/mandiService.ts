import axios from 'axios';
import NodeCache from 'node-cache';
import { MandiPrice } from '../models/MandiPrice';
import { INDIAN_LOCATIONS } from '../data/locations';

// Cache for 30 minutes (1800 seconds)
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 300 });

const API_KEY = process.env.DATA_GOV_IN_API_KEY || process.env.VITE_DATA_GOV_IN_API_KEY;
const RESOURCE_ID = '9ef273bd-a404-4848-96da-b08ff35e73c9'; 
const BASE_URL = 'https://api.data.gov.in/resource/';

export class MandiService {
    
    static async fetchAllData() {
        const cacheKey = 'all_mandi_data';
        const cachedData = cache.get(cacheKey);
        
        if (cachedData) {
            return cachedData;
        }

        let dataToCache: any[] = [];

        // Try to fetch from data.gov.in if API key is present
        if (API_KEY) {
            try {
                const response = await axios.get(`${BASE_URL}${RESOURCE_ID}`, {
                    params: {
                        'api-key': API_KEY,
                        'format': 'json',
                        'limit': 5000 // Increased limit to get more states/districts
                    },
                    timeout: 8000 
                });
                
                if (response.data && response.data.records) {
                    dataToCache = response.data.records.map((record: any, index: number) => ({
                        id: `api_${index}`,
                        crop: record.commodity,
                        rate: parseInt(record.modal_price) || 0,
                        min_price: parseInt(record.min_price) || 0,
                        max_price: parseInt(record.max_price) || 0,
                        change: "0",
                        trend: "neutral",
                        mandi: record.market,
                        district: record.district,
                        state: record.state,
                        date: record.arrival_date
                    }));
                }
            } catch (error) {
                console.error("⚠️ [MandiService] Failed to fetch from Agmarknet, using DB/Fallbacks.");
            }
        }

        // Always try to include DB data
        try {
            const dbPrices = await MandiPrice.find().sort({ date: -1 }).limit(500);
            if (dbPrices && dbPrices.length > 0) {
                const dbMapped = dbPrices.map((p: any) => ({
                    id: p._id.toString(),
                    crop: p.crop,
                    rate: typeof p.rate === 'number' ? p.rate : parseInt(String(p.rate).replace(/[^0-9]/g, '')) || 2200,
                    min_price: p.rate * 0.9,
                    max_price: p.rate * 1.1,
                    change: p.change || "0",
                    trend: p.trend || "neutral",
                    mandi: p.mandi,
                    district: p.district,
                    state: p.state,
                    date: p.date
                }));
                dataToCache = [...dataToCache, ...dbMapped];
            }
        } catch (dbError) {
            console.error("⚠️ [MandiService] DB fetch failed.");
        }

        // If still empty, add a small baseline of common data
        if (dataToCache.length === 0) {
            dataToCache = [
                { id: "f1", crop: "Paddy", rate: 2200, min_price: 2100, max_price: 2300, change: "+50", trend: "up", mandi: "Adoni", district: "Kurnool", state: "Andhra Pradesh", date: new Date().toISOString() },
                { id: "f2", crop: "Wheat", rate: 2150, min_price: 2000, max_price: 2200, change: "+20", trend: "up", mandi: "Karnal", district: "Karnal", state: "Punjab", date: new Date().toISOString() },
                { id: "f3", crop: "Cotton", rate: 7200, min_price: 7000, max_price: 7500, change: "-100", trend: "down", mandi: "Guntur Market Yard", district: "Guntur", state: "Andhra Pradesh", date: new Date().toISOString() }
            ];
        }

        cache.set(cacheKey, dataToCache);
        return dataToCache;
    }

    static async getStates() {
        // Return ALL Indian states from our comprehensive list
        return INDIAN_LOCATIONS.states.map(s => s.state).sort();
    }

    static async getDistricts(state: string) {
        if (!state || state === 'all') return [];
        
        // Find districts from our comprehensive list
        const stateObj = INDIAN_LOCATIONS.states.find(s => s.state.toLowerCase() === state.toLowerCase());
        if (stateObj) {
            return stateObj.districts.sort();
        }

        // Fallback to searching data if not in static list
        const data = await this.fetchAllData();
        const districts = new Set(
            data
                .filter((item: any) => item.state.toLowerCase() === state.toLowerCase())
                .map((item: any) => item.district)
        );
        return Array.from(districts).sort();
    }

    static async getMarkets(state: string, district: string) {
        if (!state || !district || state === 'all' || district === 'all') return [];
        
        const data = await this.fetchAllData();
        const markets = new Set(
            data
                .filter((item: any) => 
                    item.state.toLowerCase() === state.toLowerCase() && 
                    item.district.toLowerCase() === district.toLowerCase()
                )
                .map((item: any) => item.mandi)
        );

        const result = Array.from(markets);
        
        // If no markets found in live data, provide a generated market so the user can select it
        if (result.length === 0) {
            return [`${district} General Market`, `${district} APMC Yard`];
        }

        return result.sort();
    }

    static async getPrices(filters: { state?: string, district?: string, mandi?: string }) {
        const data = await this.fetchAllData();
        let filtered = data.filter((item: any) => {
            let match = true;
            if (filters.state && filters.state !== 'all') {
                match = match && item.state.toLowerCase() === filters.state.toLowerCase();
            }
            if (filters.district && filters.district !== 'all') {
                match = match && item.district.toLowerCase() === filters.district.toLowerCase();
            }
            if (filters.mandi && filters.mandi !== 'all') {
                match = match && item.mandi.toLowerCase() === filters.mandi.toLowerCase();
            }
            return match;
        });

        // If user selected a specific market that doesn't have data, return a mock price for it
        if (filtered.length === 0 && filters.mandi && filters.mandi !== 'all') {
            return [{
                id: `mock_${Date.now()}`,
                crop: "Paddy (General)",
                rate: 2150,
                min_price: 2000,
                max_price: 2300,
                change: "0",
                trend: "neutral",
                mandi: filters.mandi,
                district: filters.district || "Unknown",
                state: filters.state || "Unknown",
                date: new Date().toISOString()
            }];
        }

        return filtered;
    }
}
