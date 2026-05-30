// Vercel Serverless Function for Claude API
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

    if (!image || !breedName) {
      return res.status(400).json({ error: 'Missing image or breedName' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const client = new Anthropic({
      apiKey: apiKey
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
    console.error('Error calling Claude API:', error);
    res.status(500).json({
      error: 'Failed to analyze drawing',
      details: error.message
    });
  }
}