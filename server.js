import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.VEO_API_KEY || "sk-XXXX";
const API_BASE = "https://api.openai.com/v1"; 

// serve file HTML
app.use(express.static(path.join(__dirname, "public")));

app.post("/v1/videos:generate", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/videos:generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});