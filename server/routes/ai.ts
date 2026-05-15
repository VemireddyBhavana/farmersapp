import { Request, Response } from "express";
import axios from "axios";

const getExpertPrompt = (mentor: any, lang: string = "en") => {
    const skill = mentor?.specialty || "General Agriculture";
    
    let specialtyInstructions = "";
    if (skill === "Digital Literacy Trainer") {
        specialtyInstructions = `
CORE CURRICULUM:
1. Assess Digital Level: Ask about smartphone, WhatsApp, UPI, Aadhaar, and Govt apps.
2. Most Important Apps: PM-KISAN, Kisan Suvidha, mKisan, PMFBY, eNAM.
3. UPI & Payments: Teach safely (PhonePe/GPay). NEVER share PIN.
4. Digital Safety: KYC fraud, Loan fraud, PM-KISAN fraud prevention.
5. Land Records: Dharani (TS), Meebhoomi (AP), Bhoomi (KA), Mahabhulekh (MH).
6. WhatsApp for Business: Join groups, share photos, connect with buyers.`;
    } else if (skill === "Mental Health & Crisis Support") {
        specialtyInstructions = "GOAL: Detect distress. Be compassionate. Address India's farmer suicide epidemic with AI-powered empathy. Connect to 1800-helpline if needed.";
    } else if (skill === "Fake Input Detector") {
        specialtyInstructions = "GOAL: Teach verification of seeds, fertilizers, and pesticides. Prevent fraud losses.";
    } else if (skill === "Carbon Credits Guide") {
        specialtyInstructions = "GOAL: Unlock extra income (₹7.5k-₹50k/yr). Connect to Boomitra/Nurture.farm.";
    }

    return `
🚀 SYSTEM IDENTITY: YOU ARE ${mentor?.name || "A WORLD-CLASS AGRICULTURAL EXPERT"}.
TITLE: ${mentor?.title || "Senior Scientist"}
SPECIALTY: ${skill}

${specialtyInstructions}

CORE REQUIREMENTS:
1. RESPOND IN THE USER'S PREFERRED LANGUAGE (CODE: ${lang}).
2. START YOUR RESPONSE WITH THE 🚀 EMOJI.
3. ADOPT THE PERSONA: Be professional, encouraging, and highly technical.
4. Provide actionable advice for farmers based on your specialty.
`;
};

const getInterviewerPrompt = (topic: string, mentor: any, lang: string = "en") => `
🚀 SYSTEM IDENTITY: YOU ARE ${mentor?.name || "AN AI INTERVIEWER"}.
ROLE: ${mentor?.role || "Agricultural Expert"}
TRAIT: ${mentor?.trait || "Professional"}
TOPIC: ${topic}

CORE REQUIREMENTS:
1. CONDUCT A MOCK INTERVIEW FOR A FARMER.
2. RESPOND IN THE USER'S PREFERRED LANGUAGE (CODE: ${lang}).
3. ASK ONE QUESTION AT A TIME.
4. BE CONCISE AND PRACTICAL.
5. START YOUR RESPONSE WITH THE 🎤 EMOJI.
`;

export const handleAI = async (req: Request, res: Response) => {
    const { messages, mode, mentor, topic, language = "English" } = req.body;
    
    let prompt = "";
    if (mode === "interviewer") {
        prompt = getInterviewerPrompt(topic, mentor, language);
    } else {
        prompt = getExpertPrompt(mentor, language);
    }

    // 1. Try Gemini
    if (process.env.GEMINI_API_KEY) {
        try {
            const geminiMessages = messages.map((m: any) => ({
                role: m.role === "assistant" || m.role === "ai" ? "model" : "user",
                parts: [{ text: m.content }]
            }));

            // If it's a new conversation, add system instruction
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                { 
                    systemInstruction: { parts: [{ text: prompt }] },
                    contents: geminiMessages 
                }
            );
            const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) return res.json({ reply });
        } catch (err) { 
            console.error("Gemini failed in AI route:", err); 
        }
    }

    // Fallback
    const lastUserMsg = messages[messages.length - 1]?.content || "";
    let fallbackReply = `🚀 [Expert Protocol] I recommend checking your soil moisture and applying organic fertilizers. How else can I help?`;
    
    if (mode === "interviewer") {
        fallbackReply = `🎤 [Interview Mode] That's an interesting point about ${topic}. Can you tell me more about how you handle crop rotation?`;
    }

    res.json({ reply: fallbackReply });
};

export const handleInterviewFeedback = async (req: Request, res: Response) => {
    const { messages, topic } = req.body;
    
    // Simulate complex analysis
    const score = 75 + Math.floor(Math.random() * 20);
    const badgeTier = score > 90 ? "Gold" : score > 80 ? "Silver" : "Bronze";
    
    const feedback = {
        score,
        badgeTier,
        summary: `You showed a deep understanding of ${topic}. Your answers were practical and showed good field experience.`,
        strengths: [
            "Clear technical communication",
            "Focus on sustainability",
            "Practical problem-solving"
        ],
        improvements: [
            "Consider more precise data points",
            "Expand on resource management",
            "Integrate more weather-based planning"
        ],
        recommendedResources: [
            { type: "Guide", title: `Advanced ${topic} Techniques`, link: "/growing-guide" },
            { type: "Video", title: "Success Stories in Modern Farming", link: "/help-center" }
        ]
    };

    // Optional: Use Gemini to generate real feedback if key exists
    if (process.env.GEMINI_API_KEY) {
        try {
            const transcript = messages.map((m: any) => `${m.role}: ${m.content}`).join("\n");
            const feedbackPrompt = `Analyze this interview transcript about ${topic}. Provide a JSON response with: score (0-100), badgeTier (Gold/Silver/Bronze), summary (short paragraph), strengths (array of 3), improvements (array of 3).`;
            
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                { 
                    contents: [{ parts: [{ text: `${feedbackPrompt}\n\nTRANSCRIPT:\n${transcript}` }] }] 
                }
            );
            
            const aiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (aiReply) {
                const cleaned = aiReply.replace(/```json|```/g, "").trim();
                const parsed = JSON.parse(cleaned);
                return res.json({ ...feedback, ...parsed });
            }
        } catch (err) {
            console.error("Gemini feedback failed");
        }
    }

    res.json(feedback);
};
