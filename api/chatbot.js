export default async function handler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://wander-wise-smart-routes-hidden-gems-travel-smarter-b7vtijzkc.vercel.app/",
        "X-Title": "Your App Name"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: userMessage }],
      }),
    });



    const result = await response.json();
    console.log("OpenRouter API response:", result);

    if (!result.choices || result.choices.length === 0) {
  return res.status(500).json({ error: "No response from model" });
}


    if (data.choices && data.choices[0]) {
      res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'No response from model' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
