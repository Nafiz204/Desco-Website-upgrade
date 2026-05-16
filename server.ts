import axios from "axios";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
}) : null;

// API Routes
app.post("/api/meter-data", async (req, res) => {
  const { accountNo, meterNo } = req.body;

  if (!accountNo) {
    return res.status(400).json({ error: "Account number is required" });
  }

  try {
    // 1. Get Balance
    const balanceUrl = `https://prepaid.desco.org.bd/api/tkdes/customer/getBalance?accountNo=${accountNo}${meterNo ? `&meterNo=${meterNo}` : ''}`;
    const balanceResponse = await axios.get(balanceUrl);
    const balanceData = balanceResponse.data;

    // 2. Try to get more info if possible (some endpoints might be guessed or derived from GitHub)
    // For now, let's use the data we got and fill with mock for missing pieces if any
    // The balanceData usually includes: { balance: ..., meterNo: ..., lastRechargeAmount: ..., rechargeTime: ... }
    
    const result = {
      customerName: balanceData.customerName || "DESCO Customer",
      accountNo: accountNo,
      meterNo: balanceData.meterNo || meterNo || "N/A",
      balance: parseFloat(balanceData.balance || "0"),
      lastRecharge: parseFloat(balanceData.lastRechargeAmount || "0"),
      lastRechargeDate: balanceData.rechargeTime || new Date().toISOString(),
      currentUsageRate: 2.1, // Mocked rate as it's hard to get from a single balance call
      status: balanceData.status || "Active",
      location: balanceData.location || "Dhaka, Bangladesh",
      usageHistory: [
        { month: "Jan", usage: 120 },
        { month: "Feb", usage: 150 },
        { month: "Mar", usage: 130 },
        { month: "Apr", usage: 170 },
        { month: "May", usage: 210 },
      ]
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching meter data:", error);
    res.status(500).json({ error: "Failed to fetch data from DESCO portal" });
  }
});

app.post("/api/analyze-usage", async (req, res) => {
  if (!ai) {
    return res.status(503).json({ error: "AI service not configured" });
  }

  const { usageHistory, balance } = req.body;

  try {
    const prompt = `
      As an expert energy consultant, analyze this DESCO prepaid meter data:
      Current Balance: ৳${balance}
      Usage History (last 5 months): ${JSON.stringify(usageHistory)}
      
      Provide 3 specific, concise energy-saving tips and a prediction for how long the current balance might last based on the average usage.
      Format the response in Markdown.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    res.json({ analysis: response.text });
  } catch (error) {
    console.error("Gemini analysis error:", error);
    res.status(500).json({ error: "Failed to analyze data" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
