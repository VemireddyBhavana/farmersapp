import { Request, Response } from "express";
import { Groq } from "groq-sdk";
import axios from "axios";
import multer from "multer";

// Multer middleware for handling single image uploads
export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 }, // Max 4MB
}).single("image");

// System prompt for agricultural advisor
const FARMER_SYSTEM_PROMPT = `You are an expert agricultural advisor for Indian farmers in Andhra Pradesh.
Help with: crop diseases, weather advice, market prices, and government schemes.
Rules:
- Speak simply and practically.
- Support questions in Telugu, Hindi, and English. Respond in the same language the farmer used.
- For crop diseases: name the disease, explain symptoms, give treatment steps.
- For weather: give irrigation and farming advice based on current conditions.
- For market prices: guide on selling via eNAM and Agmarknet.
- For government schemes: explain PM-KISAN, PM Fasal Bima Yojana, Kisan Credit Card eligibility and how to apply.
- Keep answers under 150 words — farmers need quick, clear answers.
- Always end with one actionable tip.`;

// Express Handler for AI Voice/Text Chat
export const handleExpertHelpChat = async (req: Request, res: Response) => {
  try {
    const { messages, weatherContext, language = "en" } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const fullSystemPrompt = `${FARMER_SYSTEM_PROMPT}\n\n[Current Weather Context]:\n${weatherContext || "No weather data available."}`;

    // 1. Try Groq
    if (process.env.GROQ_API_KEY) {
      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
          model: "llama3-70b-8192",
          messages: [
            { role: "system", content: fullSystemPrompt },
            ...messages.map((m: any) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 512,
        });

        const reply = completion.choices[0]?.message?.content;
        if (reply) {
          return res.json({ reply });
        }
      } catch (groqErr) {
        console.warn("⚠️ Groq Chat API failed. Falling back to Gemini...", groqErr);
      }
    }

    // 2. Fallback to Gemini (if Groq key is missing or fails)
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            systemInstruction: { parts: [{ text: fullSystemPrompt }] },
            contents: messages.map((m: any) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
          }
        );
        const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return res.json({ reply });
        }
      } catch (geminiErr) {
        console.error("❌ Gemini Chat fallback failed:", geminiErr);
      }
    }

    // Default fallback responses if both APIs are down/unconfigured
    const lastUserMsg = (messages[messages.length - 1]?.content || "").toLowerCase().trim();
    const langKey = language.startsWith("te") ? "te" : language.startsWith("hi") ? "hi" : "en";
    
    const replies: Record<string, { greet: string; disease: string; weather: string; scheme: string; price: string; def: string }> = {
        en: {
            greet: "Hello! I am your AI agricultural expert. How can I assist you with your crops, weather, market prices, or government schemes today?",
            disease: "For crop disease identification, please upload a leaf photo in our Crop Disease Detection section. I recommend keeping tools sterilized and ensuring proper plant spacing.",
            weather: "Based on weather alerts, ensure paddy fields have proper drainage for upcoming heavy rains. Water early on hot sunny days.",
            scheme: "You can apply for PM-KISAN for direct income support, or Kisan Credit Card (KCC) for low-interest cultivation loans starting at 4%.",
            price: "Transparent bidding on the eNAM portal helps farmers secure competitive market rates. I can guide you through the registration process.",
            def: "Namaste! I am your expert advisor. Please verify soil conditions and ensure optimal watering. Let me know how I can help you with crops, weather, or pricing."
        },
        hi: {
            greet: "नमस्ते! आज मैं आपकी फसलों, मौसम, बाजार की कीमतों या सरकारी योजनाओं के बारे में क्या मदद कर सकता हूँ?",
            disease: "फसल रोग की पहचान के लिए, कृपया हमारे फसल रोग पहचान अनुभाग में पत्ते की तस्वीर अपलोड करें। औजारों को स्वच्छ रखें।",
            weather: "मौसम के अनुसार, भारी बारिश के लिए खेतों में पानी की निकासी की उचित व्यवस्था करें।",
            scheme: "आप पीएम-किसान (सीधी सहायता) या किसान क्रेडिट कार्ड (KCC) के माध्यम से कम ब्याज वाले ऋण का लाभ उठा सकते हैं।",
            price: "ई-नाम (eNAM) पोर्टल पर पंजीकरण करके प्रतिस्पर्धी मूल्य प्राप्त कर सकते हैं।",
            def: "नमस्ते! मैं आपका कृषि सलाहकार हूँ। मिट्टी की नमी की जाँच करें और उचित सिंचाई करें। फसल, मौसम या कीमत के बारे में पूछें।"
        },
        te: {
            greet: "నమస్తే! ఈరోజు మీ పంటలు, వాతావరణం, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి నేను మీకు ఎలా సహాయం చేయగలను?",
            disease: "పంట తెగుళ్లను గుర్తించడానికి, దయచేసి పంట తెగుళ్ల గుర్తింపు విభాగంలో ఆకు ఫోటోను అప్‌లోడ్ చేయండి. పరికరాలను శుభ్రంగా ఉంచండి.",
            weather: "వాతావరణ హెచ్చరికల ప్రకారం, రాబోయే భారీ వర్షాల కోసం వరి పొలాల్లో సరైన పారుదల సౌకర్యం కల్పించండి.",
            scheme: "మీరు పీఎం-కిసాన్ (నేరుగా మద్దతు) లేదా కిసాన్ క్రెడిట్ కార్డ్ (KCC) ద్వారా తక్కువ వడ్డీ రుణాల ప్రయోజనాన్ని పొందవచ్చు.",
            price: "అధికారిక ఈ-నామ్ (eNAM) పోర్టల్‌లో నమోదు చేసుకోవడం ద్వారా మధ్యవర్తుల ప్రమేయం లేకుండా మంచి ధరలు పొందవచ్చు.",
            def: "నమస్తే! నేను మీ వ్యవసాయ సలహాదారుని. దయచేసి నేల తేమను తనిఖీ చేసి, తగినంత నీరు పెట్టండి. పంటలు, వాతావరణం లేదా ధరల గురించి నన్ను అడగండి."
        }
    };

    const set = replies[langKey] || replies.en;
    let fallbackReply = "";
    
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

    res.json({ reply: fallbackReply });
  } catch (error) {
    console.error("❌ Chat API critical error:", error);
    res.status(500).json({ error: "Failed to process chat conversation" });
  }
};

// Express Handler for Vision Crop Disease Detection
export const handleExpertHelpDisease = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image/JPEG or PNG file." });
    }

    const base64Image = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;
    
    // Retrieve language from req.body (populated by multer for text fields)
    const lang = req.body.language || "en";
    
    let diseasePrompt = "You are an agricultural expert. Analyze this crop photo. Identify: 1) Disease name 2) Symptoms visible 3) Treatment steps 4) Prevention tips. Be specific and practical for Indian farmers.";
    if (lang === "te") {
      diseasePrompt += " Provide your response entirely in Telugu language.";
    } else if (lang === "hi") {
      diseasePrompt += " Provide your response entirely in Hindi language.";
    }

    // 1. Try Groq (Vision Model)
    if (process.env.GROQ_API_KEY) {
      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
          model: "llama-3.2-11b-vision-preview", // Stably supported vision model on Groq
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: diseasePrompt },
                {
                  type: "image_url",
                  image_url: { url: `data:${mimeType};base64,${base64Image}` },
                },
              ],
            },
          ],
        });

        const diagnosis = completion.choices[0]?.message?.content;
        if (diagnosis) {
          return res.json({ diagnosis });
        }
      } catch (groqErr) {
        console.warn("⚠️ Groq Vision API failed. Falling back to Gemini...", groqErr);
      }
    }

    // 2. Fallback to Gemini (Vision API)
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  { text: diseasePrompt },
                  {
                    inlineData: {
                      mimeType: mimeType,
                      data: base64Image,
                    },
                  },
                ],
              },
            ],
          }
        );
        const diagnosis = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (diagnosis) {
          return res.json({ diagnosis });
        }
      } catch (geminiErr) {
        console.error("❌ Gemini Vision fallback failed:", geminiErr);
      }
    }

    // Mock response if all AI services fail/offline (localized)
    const fallbacks: Record<string, string> = {
      en: "**Disease Name**: Undetermined (Network Offline)\n\n**Symptoms**: Unable to process image analysis.\n\n**Treatment**: Please consult a local agricultural extension officer.\n\n**Prevention**: Keep tools sterilized and ensure optimal spacing between plants.",
      hi: "**रोग का नाम**: अनिर्धारित (नेटवर्क ऑफ़लाइन)\n\n**लक्षण**: छवि विश्लेषण करने में असमर्थ।\n\n**उपचार**: कृपया स्थानीय कृषि विस्तार अधिकारी से संपर्क करें।\n\n**निवारण**: उपकरणों को रोगाणुरहित रखें और पौधों के बीच इष्टतम दूरी सुनिश्चित करें।",
      te: "**వ్యాధి పేరు**: నిర్ధారించబడలేదు (నెట్‌వర్క్ ఆఫ్‌లైన్)\n\n**లక్షణాలు**: చిత్ర విశ్లేషణను ప్రాసెస్ చేయడం సాధ్యం కాలేదు.\n\n**చికిత్స**: దయచేసి స్థానిక వ్యవసాయ విస్తరణ అధికారిని సంప్రదించండి.\n\n**నివారణ**: పరికరాలను క్రిమిరహితంగా ఉంచండి మరియు మొక్కల మధ్య సరైన దూరాన్ని నిర్ధారించండి."
    };

    res.json({
      diagnosis: fallbacks[lang] || fallbacks.en,
    });
  } catch (error) {
    console.error("❌ Disease Detection critical error:", error);
    res.status(500).json({ error: "Crop disease detection analysis failed" });
  }
};
