async function generateQuestions() {
    const jobDescription = document.getElementById('jobDescription').value;
    const generateBtn = document.querySelector('button[onclick="generateQuestions()"]');
    const loadingDiv = document.getElementById('loading');
    const outputDiv = document.getElementById('output');

    if (!jobDescription) {
        alert("Please enter a job description!");
        return;
    }

    // Disable the button and show loading message
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";
    loadingDiv.style.display = "block";
    outputDiv.innerHTML = ""; // Clear previous output

    try {
        // Send the job description to the backend
        const response = await fetch('/generate-questions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ jobDescription }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch questions");
        }

        // Get the response from the backend
        const data = await response.json();
        console.log("Backend Response:", data); // Log the backend response

        // Display the generated questions
        if (data.questions && data.questions.trim()) {
            const questions = data.questions.trim().split("\n").map(q => `<p>${q}</p>`).join('');
            outputDiv.innerHTML = '<h3>Interview Questions:</h3>' + questions;
        } else {
            outputDiv.innerHTML = "<p>No questions generated. Please try again with a different job description.</p>";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    } finally {
        // Re-enable the button and hide loading message
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Questions";
        loadingDiv.style.display = "none";
    }
}

// Clear function to clear the input and output
function clearInput() {
    document.getElementById('jobDescription').value = '';
    document.getElementById('output').innerHTML = '';
}