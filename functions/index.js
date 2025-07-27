// Load environment variables from .env file
require("dotenv").config();

/**
 * Import function triggers from their respective submodules
 */
const { setGlobalOptions } = require("firebase-functions/v2/options");
const { onRequest } = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");

// Set default region and timeout
setGlobalOptions({ region: "us-central1", timeoutSeconds: 60 });

// OpenAI Configuration using environment variable
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Cloud Function: chatWithGPT
exports.chatWithGPT = onRequest(async (req, res) => {
  const prompt = req.body.prompt || "Say hello";

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error talking to OpenAI");
  }
});
