const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Correct usage for OpenAI SDK v4+:
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful coding assistant." },
        { role: "user", content: userMessage }
      ],
      max_tokens: 150
    });

    const reply = completion.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Sorry, I had trouble answering." });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
