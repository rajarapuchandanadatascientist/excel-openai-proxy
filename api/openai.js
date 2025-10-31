// api/hello.js
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hello from Vercel!',
    timestamp: new Date().toISOString()
  });
}
// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const prompt = req.query.prompt || "Hello";

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-4",
//         messages: [{ role: "user", content: prompt }],
//       }),
//     });

//     const data = await response.json();
//     return res.status(200).json({ answer: data.choices[0].message.content });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }
