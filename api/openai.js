export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const prompt = req.query.prompt || "Hello";

    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: "OpenAI API key not configured",
        note: "Please set OPENAI_API_KEY in Vercel environment variables"
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Use 3.5-turbo instead of gpt-4
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      }),
    });

    const data = await response.json();

    // Check if OpenAI returned an error
    if (!response.ok) {
      return res.status(500).json({ 
        error: "OpenAI API error",
        details: data.error?.message || "Unknown error",
        fullResponse: data
      });
    }

    // Check if choices exists
    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ 
        error: "Invalid response from OpenAI",
        fullResponse: data
      });
    }

    return res.status(200).json({ 
      answer: data.choices[0].message.content,
      model: data.model
    });

  } catch (error) {
    return res.status(500).json({ 
      error: error.message,
      note: "Check if OPENAI_API_KEY is set in Vercel environment variables"
    });
  }
}