// api/openai.js
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Simple body check
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    // Call OpenAI
    const openaiResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",          // choose model you have access to
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      })
    });

    const data = await openaiResp.json();

    // Basic error handling
    if (!openaiResp.ok) {
      console.error("OpenAI error:", data);
      return res.status(502).json({ error: "OpenAI returned an error", details: data });
    }

    const answer = data.choices?.[0]?.message?.content ?? "";

    // CORS: allow Excel online and desktop safe origin. Use * for simplicity but tighten in prod.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
