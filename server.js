const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Add this line
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

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
                        content: `Give interview questions for the following job description. Job description: ${jobDescription}`,
                    },
                ],
                max_tokens: 8192,
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