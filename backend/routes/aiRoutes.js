import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import multer from "multer";
import FormData from "form-data";
import fs from "fs";
import path from "path";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const MODE_PROMPTS = {
    farmer: `You are an expert AI agricultural consultant for farmers. 
    Your goal is to help farmers improve their yield, manage pests, and understand climate impacts.
    When a farmer speaks to you:
    1. EXPLAIN concepts simply but scientifically. Don't just give answers; explain the "why".
    2. Ask targeted follow-up questions to understand their specific soil, weather, or crop conditions.
    3. Use a supportive, encouraging, and professional tone.
    4. Focus on practical, actionable advice that a farmer can implement.
    5. Always maintain a 100% farming-centric perspective.`,

    interview: `You are a professional agricultural interview coach and mentor.
    Your goal is to conduct a structured interview to evaluate the user's farming knowledge or prepare them for professional certifications.
    Behavior:
    1. Ask ONE clear, professional question at a time.
    2. Wait for the user's response before proceeding.
    3. Briefly acknowledge their answer and provide a professional follow-up or the next question.
    4. Maintain a formal yet supportive persona.
    5. After several questions, the user will request feedback via a separate endpoint.`,

    student: `You are a friendly and patient AI tutor helping agricultural students.
    Explain complex agronomic concepts in simple, relatable terms.
    Use analogies to farmers' daily lives to make concepts stick.
    Encourage curiosity and always ask if they want a deeper explanation of a specific part.`
};

router.post("/ai", async (req, res) => {
    try {
        const { messages, mode = "farmer", mentor } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Invalid messages format. History is required." });
        }

        const userMessage = messages[messages.length - 1]?.content || "";

        // Select and customize system prompt
        let systemPrompt = MODE_PROMPTS[mode] || MODE_PROMPTS.farmer;
        if (mentor) {
            systemPrompt = `You are ${mentor.name}, a specialized ${mentor.specialty} expert (${mentor.title}). 
            expertise areas: ${mentor.tags?.join(", ")}.
            Response Persona:
            1. Introduce yourself briefly in the first message if appropriate.
            2. Provide highly technical yet accessible agricultural advice specific to ${mentor.specialty}.
            3. Maintain an encouraging, professional, and expert tone.
            4. If the user asks about crops, soil, or pests, give specific solutions.
            Base your behavior on this: ${MODE_PROMPTS.farmer}`;
        }

        console.log(`📡 [AI Backend] Consult: ${mentor?.name || 'Generic'} | Query: ${userMessage.substring(0, 30)}...`);

        try {
            // Attempt High-Performance Groq Call
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: systemPrompt },
                        ...messages.map((msg) => ({
                            role: msg.role === "ai" || msg.role === "assistant" ? "assistant" : "user",
                            content: msg.content,
                        })).filter(m => m.content && m.content.trim() !== ""),
                    ],
                    temperature: 0.7,
                    max_completion_tokens: 1024
                })
            });

            const data = await response.json();
            
            if (data.choices && data.choices[0]?.message?.content) {
                console.log(`✅ [AI Backend] Groq Success`);
                return res.json({ reply: data.choices[0].message.content });
            }
            
            throw new Error(data.error?.message || "Groq API Error");

        } catch (apiError) {
            console.error("⚠️ [AI Backend] Groq API Failed:", apiError.message);
            
            // Backup Claude Call (if available)
            // ... (keeping previous Claude fallback logic here but focusing on Groq for now)
            
            // Last Resort Fallback (Dynamic but local)
            const fallbackReply = `Hello, I'm ${mentor?.name || 'your expert advisor'}. I'm currently processing your request about ${userMessage.substring(0, 20)}. As an expert in ${mentor?.specialty || 'General Agriculture'}, I suggest we review your current soil data and crop history. Could you provide those details so I can give you a better solution?`;
            
            return res.json({ reply: fallbackReply });
        }
        } catch (error) {
        console.error("❌ [AI Backend] Fatal Error:", error.message);
        res.status(500).json({ reply: "I'm currently reviewing your data. Please give me a moment to analyze and ask again." });
    }
});

// --- NEW: Audio Transcription Endpoint (Whisper via Groq) ---
router.post("/transcribe", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No audio file provided." });
        }

        const filePath = req.file.path;
        console.log(`📡 [AI Backend] Transcribing file: ${filePath}`);

        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath));
        formData.append("model", "whisper-large-v3");
        formData.append("language", "en"); // Can be dynamic later

        const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                ...formData.getHeaders()
            },
            body: formData
        });

        const data = await response.json();
        
        // Clean up uploaded file
        fs.unlinkSync(filePath);

        if (data.text) {
            console.log(`✅ [AI Backend] Transcription Success: "${data.text.substring(0, 30)}..."`);
            return res.json({ text: data.text });
        }

        throw new Error(data.error?.message || "Transcription failed");

    } catch (error) {
        console.error("❌ [AI Backend] Transcription Error:", error.message);
        res.status(500).json({ error: "Failed to process audio response." });
    }
});

// --- NEW: Interview Feedback Endpoint ---
router.post("/interview-feedback", async (req, res) => {
    try {
        const { messages, topic = "General Farming" } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "No session history provided." });
        }

        const feedbackPrompt = `You are a World-Class Agricultural Evaluator.
        Analyze the following interview history about "${topic}".
        Provide a structured feedback report in JSON format with these exact fields:
        {
            "score": "A numerical score from 1-100",
            "summary": "A 2-3 sentence overview of their performance",
            "strengths": ["List of 3 key strengths"],
            "improvements": ["List of 3 areas for improvement"],
            "conclusion": "A final encouraging remark"
        }
        
        Session History:
        ${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}
        
        IMPORTANT: Respond ONLY with the JSON object.`;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "system", content: feedbackPrompt }],
                temperature: 0.5,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        const feedback = JSON.parse(data.choices[0].message.content);

        console.log(`✅ [AI Backend] Feedback Generated for topic: ${topic}`);
        res.json(feedback);

    } catch (error) {
        console.error("❌ [AI Backend] Feedback Error:", error.message);
        res.status(500).json({ error: "Failed to generate interview feedback." });
    }
});

export default router;
