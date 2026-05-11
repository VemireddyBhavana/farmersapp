import { Request, Response } from "express";
import axios from "axios";

const getExpertPrompt = (lang: string = "en") => `🚀 SYSTEM IDENTITY: YOU ARE A WORLD-CLASS AGRICULTURAL EXPERT.
CORE REQUIREMENTS:
1. RESPOND IN THE USER'S LANGUAGE. IF THE USER ASKS IN HINDI, RESPOND IN HINDI. IF TELUGU, RESPOND IN TELUGU. CURRENT LANGUAGE CODE: ${lang}.
2. START YOUR RESPONSE WITH THE 🚀 EMOJI.
3. ADAPTIVE RESPONSIVITY:
   - If the user says "hi", "hello", or simple greetings: Respond with a friendly, professional greeting in their language.
   - If the user provides a specific farming issue: Provide Analysis, Root Cause, Solution, and Prevention in their language.`;

const fallbacks: Record<string, string> = {
    en: "🚀 [Expert Protocol] I suggest maintaining balanced NPK levels and checking for visible soil stress. Please provide more details.",
    hi: "🚀 [विशेषज्ञ प्रोटोकॉल] मेरा सुझाव है कि संतुलित NPK स्तर बनाए रखें और दृश्यमान मिट्टी के तनाव की जांच करें। कृपया अधिक विवरण प्रदान करें।",
    te: "🚀 [నిపుణుల ప్రోటోకాల్] సమతుల్య NPK స్థాయిలను నిర్వహించాలని మరియు కనిపించే నేల ఒత్తిడిని తనిఖీ చేయాలని నేను సూచిస్తున్నాను. దయచేసి మరిన్ని వివరాలను అందించండి.",
    // Add more as needed or use a default
};

export const handleExpertConsult = async (req: Request, res: Response) => {
    const { problemText, specialty = "General Agriculture", language = "en" } = req.body;
    
    const prompt = getExpertPrompt(language);

    // 1. Try Gemini
    if (process.env.GEMINI_API_KEY) {
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                { 
                    systemInstruction: { parts: [{ text: prompt }] },
                    contents: [{ parts: [{ text: problemText }] }] 
                }
            );
            const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) return res.json({ reply });
        } catch (err) { console.error("Gemini failed"); }
    }

    // Fallback
    res.json({ reply: fallbacks[language] || fallbacks.en });
};

export const handleSmartAssistant = async (req: Request, res: Response) => {
    const { text, imageData, language = "en" } = req.body;
    
    const prompt = getExpertPrompt(language);

    if (process.env.GEMINI_API_KEY) {
        try {
            const parts: any[] = [{ text: `${prompt}\n\nFarmer Query: ${text || "Analyze this image."}` }];
            if (imageData) {
                parts.push({
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: imageData.replace(/^data:image\/[a-z]+;base64,/, "")
                    }
                });
            }

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                { contents: [{ parts }] }
            );

            const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) return res.json({ reply });
        } catch (err) { console.error("Smart Assistant failed"); }
    }

    res.json({ reply: language === "hi" ? "🚀 नमस्ते! मैं आपका एआई फार्मिंग सहायक हूं। मैं आज आपकी कैसे मदद कर सकता हूं?" : 
                     language === "te" ? "🚀 నమస్తే! నేను మీ AI ఫార్మింగ్ అసిస్టెంట్‌ని. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?" :
                     "🚀 Hello! I am your AI Farming Assistant. How can I help you today?" });
};
