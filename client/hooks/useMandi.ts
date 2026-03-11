import { useState, useEffect, useCallback } from "react";

export interface MandiPrice {
    crop: string;
    rate: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    mandi: string;
    state: string;
    date: string;
}

const CACHE_KEY = "ismigs_mandi_cache";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export const useMandi = () => {
    const [prices, setPrices] = useState<MandiPrice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrices = useCallback(async () => {
        setLoading(true);
        try {
            // Check cache
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_TTL) {
                    setPrices(data);
                    setLoading(false);
                    return;
                }
            }

            // In a real app, you would fetch from an API like:
            // const response = await fetch(`https://api.data.gov.in/resource/9ef27020-a2a1-4702-8a9d-158e1000ff66?api-key=${API_KEY}&format=json`);
            // For this project, we'll simulate a dynamic response based on current date

            const mockPrices: MandiPrice[] = [
                { crop: "Paddy (Basmati)", rate: "₹4,250", change: "+50", trend: "up", mandi: "Karnal Mandi", state: "pb", date: new Date().toLocaleDateString() },
                { crop: "Wheat", rate: "₹2,200", change: "+75", trend: "up", mandi: "Khanna Mandi", state: "pb", date: new Date().toLocaleDateString() },
                { crop: "Tomato", rate: "₹1,950", change: "+150", trend: "up", mandi: "Azadpur Mandi", state: "dl", date: new Date().toLocaleDateString() },
                { crop: "Onion", rate: "₹2,350", change: "-50", trend: "down", mandi: "Lasalgaon Mandi", state: "mh", date: new Date().toLocaleDateString() },
                { crop: "Groundnut", rate: "₹6,900", change: "+100", trend: "up", mandi: "Gondal Mandi", state: "gj", date: new Date().toLocaleDateString() },
                { crop: "Cotton", rate: "₹8,000", change: "-200", trend: "down", mandi: "Adoni Mandi", state: "ap", date: new Date().toLocaleDateString() },
            ];

            setPrices(mockPrices);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data: mockPrices, timestamp: Date.now() }));
        } catch (err: any) {
            setError(err.message || "Failed to fetch mandi prices");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPrices();
    }, [fetchPrices]);

    return { prices, loading, error, refresh: fetchPrices };
};
