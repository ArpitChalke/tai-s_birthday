import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables for local testing
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY env variable is missing. Creative AI assists will utilize humorous fallback templates.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// Creative Birthday Wish Generation Endpoint
app.post("/api/generate-wish", async (req: Request, res: Response): Promise<void> => {
  const { name, sender, relationship, vibe, additionalPrompt } = req.body;

  if (!name) {
    res.status(400).json({ error: "Birthday host name is required" });
    return;
  }

  // Check if API key actually exists, if not provide a fun, well-categorized fallback local generator
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Elegant fallbacks that look beautiful
    const mockWishes: Record<string, string[]> = {
      rockstar: [
        `🎸 HEY ${name.toUpperCase()}! Here is to another year of playing life at maximum volume! May your guitar riffs be heavy, your amplifiers never blow, and your crew always scream ENCORE! Rock on, you absolute star! - Love, ${sender || "your fan"}`,
        `🤘 To the legendary ${name}! Turn up the music, pop the confetti, and smash the ceiling! Have a spectacular, high-voltage birthday celebration with maximum sparks! - From ${sender || "a solid buddy"}`
      ],
      cozy: [
        `✨ Dearest ${name}, wishing you a year filled with gentle mornings, warm cups of tea, and stars that guide your best dreams. Thank you for being such an incredibly sweet presence in my life. Happiest of birthdays! - Warmly, ${sender || "your companion"}`,
        `💖 Happy Birthday ${name}! You have a heart of pure gold. May this special milestone hug you with joy, comfort, and the warmest memories with the people you love most. - Cheers, ${sender || "your friend"}`
      ],
      funny: [
        `🍕 Happy birthday ${name}! You are officially one year closer to complaining about the music being too loud and eating dinner at 4:30 PM. Stay young, wild, and incredibly lazy! - Best, ${sender || "your favorite troublemaker"}`,
        `🍰 Congratulations on aging another 365 days, ${name}! You are like a fine cheese - a little smelly, but highly appreciated in luxurious circles. Have an epic cheat-day feast! - From ${sender || "your roast master"}`
      ],
      poetic: [
        `🧙‍♂️ To ${name}: May the tides of fate carry you to magnificent horizons. You are a constellation shining brilliantly in our sky. Here is to celebrating your grand cosmic orbits! - Sincerely, ${sender || "a believer"}`,
        `🌟 Happy Birthday, ${name}! A beautiful chapter begins today. Write it with vibrant ink, loud laughter, and massive adventurous hops! - Warmest wishes, ${sender || "your co-editor"}`
      ]
    };

    const styleKey = (vibe || "rockstar").toLowerCase();
    const fallbackOptions = mockWishes[styleKey] || mockWishes.rockstar;
    const randomWish = fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];

    res.json({ text: randomWish, isFallback: true });
    return;
  }

  try {
    const activeClient = getAiClient();
    
    // Customize system instruction based on styling
    let vibeDirective = "Make it energetic, rock-and-roll styled, and high-tempo.";
    if (vibe === "cozy") {
      vibeDirective = "Make it heartwarming, deeply emotional, comforting and sweet.";
    } else if (vibe === "funny") {
      vibeDirective = "Include an epic, ultra-witty, playful and friendly good-natured roast. Keep it hilarious, lightweight, and fun.";
    } else if (vibe === "poetic") {
      vibeDirective = "Write it like a creative constellation, slightly mystical, heroic, and highly inspiring.";
    }

    const systemInstruction = `You are a professional, high-energy Birthday Hype Host and Creative Wish Writer.
Your goal is to draft a short, customized, memorable, and stunning birthday greeting card message.
The recipient's name is ${name}.
The message is written on behalf of ${sender || "a close companion"} who is their ${relationship || "friend"}.
${vibeDirective}
Keep your response strictly under 70 words. Use 2-3 lively emojis reflecting the theme. Do not start or end with double quotation marks.
Be human, highly creative, and specific to the input details.`;

    const userPrompt = `Write a custom birthday message. Name of host: ${name}. Sender: ${sender}. Relationship: ${relationship}. Specific vibe: ${vibe}.${additionalPrompt ? ` Include specific elements like: ${additionalPrompt}` : ""}`;

    const response = await activeClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.95,
      },
    });

    const generatedText = response.text || "Happiest of birthdays! 🎂 Let's dance and drink tonight!";
    res.json({ text: generatedText.replace(/^["']|["']$/g, "").trim(), isFallback: false });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: "Failed to generate wish dynamically: " + error.message });
  }
});

// Configure Vite or Static Assets serving based on Environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode: Mount Vite's middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Development Mode: Vite middlewares mounted.");
  } else {
    // Production Mode: Serve standard compiled assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production Mode: Serving static compiled assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server successfully running on http://localhost:${PORT}`);
  });
}

startServer();
