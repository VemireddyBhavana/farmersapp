import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const testGroq = async () => {
  try {
    const key = process.env.GROQ_API_KEY;
    console.log("Testing Groq Key:", key ? "PRESENT" : "MISSING");
    if (!key) return;
    
    const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama-3.3-70b-versatile", // Using a more modern Groq model
      messages: [{ role: "user", content: "Hello" }]
    }, {
      headers: { "Authorization": `Bearer ${key}` }
    });
    console.log("GROQ SUCCESS:", response.data.choices[0].message.content);
  } catch (err) {
    console.error("GROQ FAILED:", err.response?.data?.error?.message || err.message);
  }
};

const testOpenAI = async () => {
    try {
      const key = process.env.OPENAI_API_KEY;
      console.log("Testing OpenAI Key:", key ? "PRESENT" : "MISSING");
      if (!key) return;
      
      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Hello" }]
      }, {
        headers: { "Authorization": `Bearer ${key}` }
      });
      console.log("OPENAI SUCCESS:", response.data.choices[0].message.content);
    } catch (err) {
      console.error("OPENAI FAILED:", err.response?.data?.error?.message || err.message);
    }
  };

testGroq();
testOpenAI();
