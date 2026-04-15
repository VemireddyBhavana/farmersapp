import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "Say hello." }
            ],
        });
        console.log("SUCCESS:", response.choices[0].message.content);
    } catch (error) {
        console.error("FAILED:", error.message);
        if (error.response) {
            console.error("DATA:", error.response.data);
        }
    }
}

test();
