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
    const { messages, weatherContext } = req.body;
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

    // Default hardcoded advice if both APIs are down/unconfigured
    res.json({
      reply: "Namaste! I am experiencing connection issues. Please check your soil moisture and ensure proper watering for your crops. Let's try again in a moment.",
    });
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
    const diseasePrompt = "You are an agricultural expert. Analyze this crop photo. Identify: 1) Disease name 2) Symptoms visible 3) Treatment steps 4) Prevention tips. Be specific and practical for Indian farmers.";

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

    // Mock response if all AI services fail/offline
    res.json({
      diagnosis: "**Disease Name**: Undetermined (Network Offline)\n\n**Symptoms**: Unable to process image analysis.\n\n**Treatment**: Please consult a local agricultural extension officer.\n\n**Prevention**: Keep tools sterilized and ensure optimal spacing between plants.",
    });
  } catch (error) {
    console.error("❌ Disease Detection critical error:", error);
    res.status(500).json({ error: "Crop disease detection analysis failed" });
  }
};
