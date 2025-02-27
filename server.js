const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the AI Interview Question Generator API! Use the /generate-questions endpoint.');
});

// Generate questions route
app.post('/generate-questions', async (req, res) => {
    const { jobDescription } = req.body;

    if (!jobDescription) {
        return res.status(400).json({ error: "Job description is required" });
    }

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "deepseek/deepseek-r1:free",
                messages: [
                    {
                        role: "user",
                        content: `Generate specific interview questions for the following job description. Only provide the questions, no explanations, reasoning, or additional text. Format the questions as a numbered list. Job description: ${jobDescription}`,
                    },
                ],
                max_tokens: 200,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                },
            }
        );

        const questions = response.data.choices[0].message.content;
        res.json({ questions });
    } catch (error) {
        console.error("OpenRouter API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate questions" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));