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
    const lastUserMsg = (messages[messages.length - 1]?.content || "").toLowerCase().trim();
    let fallbackReply = "";
    
    if (mode === "interviewer") {
        fallbackReply = `🎤 [Interview Mode] That's an interesting point about ${topic}. Can you tell me more about how you handle crop rotation?`;
    } else {
        const langKey = language === "Telugu" ? "te" : language === "Hindi" ? "hi" : "en";
        
        const replies: Record<string, { greet: string; disease: string; weather: string; scheme: string; price: string; def: string }> = {
            en: {
                greet: "🚀 Hello! How can I assist you with your crops, weather, market prices, or government schemes today?",
                disease: "🚀 I recommend checking for leaf spots or fungal infections. Keep tools sterilized and ensure optimal spacing between plants. Feel free to upload a photo in our Crop Disease Detection section for detailed diagnosis.",
                weather: "🚀 Ensure proper drainage for crops during rain and water early in the morning on sunny days. Keep an eye on local forecasts.",
                scheme: "🚀 You can benefit from PM-KISAN (direct support of ₹6,000/yr) or get low-interest cultivation loans via Kisan Credit Card (KCC). Let me know if you need links to apply!",
                price: "🚀 You can get competitive prices by registering on the official eNAM portal. Transparent electronic bidding helps avoid middlemen fees.",
                def: "🚀 I recommend checking your soil moisture, testing pH levels, and applying organic manure. Let me know if you have specific questions about pests, weather, or pricing."
            },
            hi: {
                greet: "🚀 नमस्ते! आज मैं आपकी फसलों, मौसम, बाजार की कीमतों या सरकारी योजनाओं के बारे में क्या मदद कर सकता हूँ?",
                disease: "🚀 मैं पत्तों के धब्बों या कवक संक्रमण की जाँच करने की सलाह देता हूँ। औजारों को स्वच्छ रखें और रोग पहचान अनुभाग में फोटो अपलोड करें।",
                weather: "🚀 बारिश के दौरान फसलों के लिए उचित जल निकासी सुनिश्चित करें और धूप वाले दिनों में सुबह जल्दी पानी दें।",
                scheme: "🚀 आप पीएम-किसान (सीधी सहायता) या किसान क्रेडिट कार्ड (KCC) के माध्यम से कम ब्याज वाले ऋण का लाभ उठा सकते हैं।",
                price: "🚀 आप आधिकारिक ई-नाम (eNAM) पोर्टल पर पंजीकरण करके प्रतिस्पर्धी मूल्य प्राप्त कर सकते हैं।",
                def: "🚀 मैं मिट्टी की नमी की जाँच करने, पीएच (pH) स्तर का परीक्षण करने और जैविक खाद डालने की सलाह देता हूँ।"
            },
            te: {
                greet: "🚀 నమస్తే! ఈరోజు మీ పంటలు, వాతావరణం, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి నేను మీకు ఎలా సహాయం చేయగలను?",
                disease: "🚀 ఆకు మచ్చలు లేదా శిలీంధ్రాల సోకకుండా తనిఖీ చేయాలని నేను సిఫార్సు చేస్తున్నాను. పరికరాలను శుభ్రంగా ఉంచండి. వ్యాధి గుర్తింపు విభాగంలో ఫోటోను అప్‌లోడ్ చేయండి.",
                weather: "🚀 వర్షం సమయంలో పంటలకు సరైన పారుదల సౌకర్యం కల్పించండి మరియు ఎండ రోజుల్లో ఉదయాన్నే నీరు పెట్టండి.",
                scheme: "🚀 మీరు పీఎం-కిసాన్ (ఆదాయ మద్దతు) లేదా కిసాన్ క్రెడిట్ కార్డ్ (KCC) ద్వారా తక్కువ వడ్డీ రుణాల ప్రయోజనాన్ని పొందవచ్చు.",
                price: "🚀 మీరు అధికారిక ఈ-నామ్ (eNAM) పోర్టల్‌లో నమోదు చేసుకోవడం ద్వారా పోటీ ధరలను పొందవచ్చు.",
                def: "🚀 నేల తేమను తనిఖీ చేయాలని, పీహెచ్ (pH) స్థాయిలను పరీక్షించాలని మరియు సేంద్రీయ ఎరువులను వాడాలని నేను సిఫార్సు చేస్తున్నాను."
            }
        };

        const set = replies[langKey] || replies.en;
        
        if (lastUserMsg.match(/\b(hi|hello|hey|namaste|hola|hii|helloo|hy)\b/)) {
            fallbackReply = set.greet;
        } else if (lastUserMsg.includes("disease") || lastUserMsg.includes("pest") || lastUserMsg.includes("leaf") || lastUserMsg.includes("spot") || lastUserMsg.includes("fungus") || lastUserMsg.includes("insect")) {
            fallbackReply = set.disease;
        } else if (lastUserMsg.includes("weather") || lastUserMsg.includes("rain") || lastUserMsg.includes("temperature") || lastUserMsg.includes("climate") || lastUserMsg.includes("monsoon")) {
            fallbackReply = set.weather;
        } else if (lastUserMsg.includes("scheme") || lastUserMsg.includes("loan") || lastUserMsg.includes("pm-kisan") || lastUserMsg.includes("pmkisan") || lastUserMsg.includes("kcc") || lastUserMsg.includes("subsidy")) {
            fallbackReply = set.scheme;
        } else if (lastUserMsg.includes("price") || lastUserMsg.includes("market") || lastUserMsg.includes("enam") || lastUserMsg.includes("mandi") || lastUserMsg.includes("sell")) {
            fallbackReply = set.price;
        } else {
            fallbackReply = set.def;
        }
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
