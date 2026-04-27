import { Request, Response } from "express";
import axios from "axios";

const expertPrompt = `🚀 SYSTEM IDENTITY: YOU ARE A WORLD-CLASS AGRICULTURAL EXPERT.
CORE REQUIREMENTS:
1. STRICT PROFESSIONAL ENGLISH STANDARDS. NO HINDI. NO HINGLISH.
2. START YOUR RESPONSE WITH THE 🚀 EMOJI.
3. ADAPTIVE RESPONSIVITY:
   - If the user says "hi", "hello", or simple greetings: Respond with a friendly, professional greeting.
   - If the user provides a specific farming issue: Provide Analysis, Root Cause, Solution, and Prevention.`;

export const handleExpertConsult = async (req: Request, res: Response) => {
    const { problemText, specialty = "General Agriculture" } = req.body;
    
    // 1. Try Gemini
    if (process.env.GEMINI_API_KEY) {
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                { 
                    systemInstruction: { parts: [{ text: expertPrompt }] },
                    contents: [{ parts: [{ text: problemText }] }] 
                }
            );
            const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) return res.json({ reply });
        } catch (err) { console.error("Gemini failed"); }
    }

    // Fallback
    res.json({ reply: "🚀 [Expert Protocol] I suggest maintaining balanced NPK levels and checking for visible soil stress. Please provide more details." });
};

export const handleSmartAssistant = async (req: Request, res: Response) => {
    const { text, imageData } = req.body;
    
    if (process.env.GEMINI_API_KEY) {
        try {
            const parts: any[] = [{ text: `${expertPrompt}\n\nFarmer Query: ${text || "Analyze this image."}` }];
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

    res.json({ reply: "🚀 Hello! I am your AI Farming Assistant. How can I help you today?" });
};
