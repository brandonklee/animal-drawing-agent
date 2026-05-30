# ⚠️ Important: Deployment Issue with Anthropic SDK

## The Problem

The `@anthropic-ai/sdk` package uses Node.js-specific modules that cannot run directly in the browser, even with polyfills. This causes build failures when trying to create a production build.

## Solution: Use a Backend Server

For production deployment, you **MUST** use a backend server to handle Claude API calls. Here are your options:

---

## Option 1: Vercel Serverless Functions (Recommended)

Create a Vercel serverless function to handle API calls:

### 1. Create `/api/analyze-drawing.js`:

```javascript
// api/analyze-drawing.js
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, breedName } = req.body;

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY // Server-side only!
    });

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: image,
              },
            },
            {
              type: 'text',
              text: `You are a friendly art teacher helping a 7-8 year old child learn to draw animals.

This child just drew a ${breedName} by hand on paper and took a photo of it.

Please analyze their drawing and provide encouraging feedback in this EXACT format:

🌟 What You Did Great:
- [Specific praise about 1-2 things they did well]

🎯 One Thing to Improve:
- [One constructive, helpful tip - never negative]

💡 Next Step:
[Short encouragement to try again or try a new breed]

Important:
- Always be encouraging and positive
- Use simple language for kids
- Be specific about what they did well
- Keep suggestions constructive, never critical
- Use emojis to make it fun
- Keep feedback brief and easy to understand`
            }
          ],
        },
      ],
    });

    const feedbackText = message.content[0].text;

    res.status(200).json({ feedback: feedbackText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze drawing' });
  }
}
```

### 2. Update `src/services/claudeService.js`:

```javascript
export const analyzeDrawing = async (imageBase64, breedName) => {
  try {
    // Remove data URL prefix if present
    const base64Image = imageBase64.split(',')[1] || imageBase64;

    const response = await fetch('/api/analyze-drawing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
        breedName: breedName
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const feedbackText = data.feedback;

    // Format the feedback
    const formattedFeedback = feedbackText
      .split('\n')
      .map(line => {
        if (line.startsWith('🌟') || line.startsWith('🎯') || line.startsWith('💡')) {
          return `<h3>${line}</h3>`;
        } else if (line.startsWith('- ')) {
          return `<li>${line.substring(2)}</li>`;
        } else if (line.trim()) {
          return `<p>${line}</p>`;
        }
        return '';
      })
      .join('');

    return formattedFeedback;
  } catch (error) {
    console.error('Error calling API:', error);

    // Fallback feedback
    return `
      <h3>🌟 What You Did Great:</h3>
      <ul>
        <li>You worked really hard on this drawing!</li>
        <li>I can see you followed the steps!</li>
      </ul>

      <h3>🎯 One Thing to Improve:</h3>
      <p>Keep practicing and your ${breedName} will look even more amazing!</p>

      <h3>💡 Next Step:</h3>
      <p>Try drawing it again, or pick a new animal to draw! You're doing great! 🎨</p>
    `;
  }
};
```

### 3. Add environment variable to Vercel:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

### 4. Deploy:

```bash
npm install -g vercel
vercel
```

---

## Option 2: Express Backend

Create a separate Express server:

### 1. Create `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.post('/api/analyze-drawing', async (req, res) => {
  try {
    const { image, breedName } = req.body;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: image,
              },
            },
            {
              type: 'text',
              text: `[same prompt as above]`
            }
          ],
        },
      ],
    });

    res.json({ feedback: message.content[0].text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze drawing' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2. Run backend:

```bash
cd backend
npm install express cors @anthropic-ai/sdk
ANTHROPIC_API_KEY=your_key node server.js
```

### 3. Update frontend to point to backend:

```javascript
// In claudeService.js
const response = await fetch('http://localhost:3001/api/analyze-drawing', {
  // ... rest of fetch
});
```

---

## Option 3: Remove Anthropic SDK (Development Only)

For testing the UI without API calls:

1. Remove `@anthropic-ai/sdk` from package.json
2. Update `claudeService.js` to always return mock feedback
3. Build and deploy the frontend only

This is only suitable for UI testing, not production use.

---

## Recommended Approach

**Use Vercel Serverless Functions** - It's the easiest and most secure way to deploy this app.

1. No separate backend server to manage
2. Automatic scaling
3. Environment variables are secure
4. Free tier is generous
5. Simple deployment with `vercel` CLI

---

## Current Status

The app is fully functional **locally** with `npm start` if you:
1. Add `.env` file with `REACT_APP_ANTHROPIC_API_KEY`
2. Accept the `dangerouslyAllowBrowser: true` warning

But for production deployment, you **must** implement one of the backend options above.
