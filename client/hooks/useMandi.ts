import { useState, useEffect, useCallback } from "react";

export interface MandiPrice {
    id: string;
    crop: string;
    rate: string | number;
    min_price?: number;
    max_price?: number;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    mandi: string;
    district: string;
    state: string;
    date: string;
}

const CACHE_KEY = "ismigs_mandi_cache";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export const useMandi = () => {
    const [prices, setPrices] = useState<MandiPrice[]>([]);
    const [states, setStates] = useState<string[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrices = useCallback(async (stateFilter = 'all', districtFilter = 'all', mandiFilter = 'all') => {
        setLoading(true);
        try {
            // Build query params
            const params = new URLSearchParams();
            if (stateFilter !== 'all') params.append('state', stateFilter);
            if (districtFilter !== 'all') params.append('district', districtFilter);
            if (mandiFilter !== 'all') params.append('mandi', mandiFilter);

            const queryString = params.toString() ? `?${params.toString()}` : '';
            const response = await fetch(`/api/market/prices${queryString}`);
            if (!response.ok) throw new Error("Failed to fetch market data");
            
            const data = await response.json();
            setPrices(data);
        } catch (err: any) {
            console.error("Mandi API Error, using frontend fallback:", err);
            const fallbackData = [
                { id: "f1", crop: "Paddy", rate: "₹2,200", change: "+50", trend: "up", mandi: "Adoni", district: "Kurnool", state: "AP", date: new Date().toISOString() },
                { id: "f2", crop: "Wheat", rate: "₹2,150", change: "-20", trend: "down", mandi: "Karnal", district: "Karnal", state: "PB", date: new Date().toISOString() }
            ];
            setPrices(fallbackData as any);
            setError(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchStates = useCallback(async () => {
        try {
            const response = await fetch(`/api/market/states?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Mandi API: Fetched states", data.length);
                setStates(data);
            }
        } catch (e) {
            console.error("Failed to fetch states", e);
        }
    }, []);

    const fetchDistricts = useCallback(async (state: string): Promise<string[]> => {
        if (!state || state === 'all') return [];
        try {
            const response = await fetch(`/api/market/districts?state=${encodeURIComponent(state)}`);
            if (response.ok) return await response.json();
        } catch (e) {
            console.error("Failed to fetch districts", e);
        }
        return [];
    }, []);

    const fetchMarkets = useCallback(async (state: string, district: string): Promise<string[]> => {
        if (!state || state === 'all' || !district || district === 'all') return [];
        try {
            const response = await fetch(`/api/market/mandi?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`);
            if (response.ok) return await response.json();
        } catch (e) {
            console.error("Failed to fetch markets", e);
        }
        return [];
    }, []);

    useEffect(() => {
        fetchStates();
        fetchPrices();
    }, [fetchStates, fetchPrices]);

    return { 
        prices, 
        states,
        loading, 
        error, 
        refresh: fetchPrices,
        fetchDistricts,
        fetchMarkets
    };
};
