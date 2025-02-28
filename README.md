# ask-rk
AI Interview Question Generator. Visit the [live site](https://ask-rk.onrender.com/)

### Frequently Asked Questions

<details>
    <summary>What's ask-rk ?</summary>
    
    ask-rk is an AI-powered tool that generates interview questions.
</details>

<details>
    <summary>Which Ai model are you using?</summary>
    
    ask-rk uses the free-tier version of DeepSeek's DeepSeek-R1 model: `deepseek/deepseek-r1:free`.
</details>

<details>
    <summary>Why is the response generation slow?</summary>
    
    ask-rk is hosted on [Render.com](https://render.com/) using a Free-Teir plan, so there are some resource limitation.
    
    Free Tier:
        - Free static site hosting.
        - Free backend services (e.g., Node.js/Express): 1 free instance with 512 MB RAM.
        - Bandwidth: Included for free tier.

    Limitations:
        - Free backend instances sleep after 15 minutes of inactivity.
        - Limited to 1 free instance per service.

    Best For: Simple backend hosting with minimal traffic.
</details>

### Project Structure
```
project-repo/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js
├── package.json
└── .env
```