import { useState, useEffect, useCallback } from "react";

export interface MandiPrice {
    id: string;
    crop: string;
    rate: string;
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
                { id: "mandi-ap-adoni", crop: "Cotton", rate: "₹8,000", change: "-200", trend: "down", mandi: "Adoni Mandi", district: "Kurnool", state: "ap", date: new Date().toLocaleDateString() },
                { id: "mandi-ap-guntakal", crop: "Cotton", rate: "₹8,200", change: "+150", trend: "up", mandi: "Guntakal Mandi", district: "Anantapur", state: "ap", date: new Date().toLocaleDateString() },
                { id: "mandi-ap-anantapur", crop: "Cotton", rate: "₹7,900", change: "-50", trend: "down", mandi: "Anantapur Mandi", district: "Anantapur", state: "ap", date: new Date().toLocaleDateString() },
                { id: "mandi-dl-azadpur", crop: "Tomato", rate: "₹1,950", change: "+150", trend: "up", mandi: "Azadpur Mandi", district: "Delhi", state: "dl", date: new Date().toLocaleDateString() },
                { id: "mandi-gj-gondal", crop: "Groundnut", rate: "₹6,900", change: "+100", trend: "up", mandi: "Gondal Mandi", district: "Rajkot", state: "gj", date: new Date().toLocaleDateString() },
                { id: "mandi-mh-lasalgaon", crop: "Onion", rate: "₹2,350", change: "-50", trend: "down", mandi: "Lasalgaon Mandi", district: "Nashik", state: "mh", date: new Date().toLocaleDateString() },
                { id: "mandi-mh-pimpalgaon", crop: "Onion", rate: "₹2,100", change: "0", trend: "neutral", mandi: "Pimpalgaon Mandi", district: "Nashik", state: "mh", date: new Date().toLocaleDateString() },
                { id: "mandi-pb-karnal", crop: "Paddy (Basmati)", rate: "₹4,250", change: "+50", trend: "up", mandi: "Karnal Mandi", district: "Karnal", state: "pb", date: new Date().toLocaleDateString() },
                { id: "mandi-pb-khanna", crop: "Wheat", rate: "₹2,200", change: "+75", trend: "up", mandi: "Khanna Mandi", district: "Ludhiana", state: "pb", date: new Date().toLocaleDateString() },
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
