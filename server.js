const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config(); // Load environment variables from .env file

app.use(express.json());
app.use(cors()); // Enable CORS for frontend-backend communication

// Replace with your OpenRouter API key in a .env file
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/generate-questions', async (req, res) => {
    const { jobDescription } = req.body;

    if (!jobDescription) {
        return res.status(400).json({ error: "Job description is required" });
    }

    try {
        // Send the job description to OpenRouter API
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
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                },
            }
        );

        // Log the full response for debugging
        console.log("OpenRouter Full Response:", JSON.stringify(response.data, null, 2));

        // Extract the generated questions
        const questions = response.data.choices[0].message.content;
        console.log("Generated Questions:", questions);

        // Send the questions back to the frontend
        res.json({ questions });
    } catch (error) {
        console.error("OpenRouter API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate questions" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));