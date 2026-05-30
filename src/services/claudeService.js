// Claude API Service - Uses serverless function backend
export const analyzeDrawing = async (imageBase64, breedName) => {
  try {
    // Remove data URL prefix if present
    const base64Image = imageBase64.split(',')[1] || imageBase64;

    // Call the serverless function
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
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const feedbackText = data.feedback;

    // Convert the feedback to HTML with proper formatting
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

    // Return fallback feedback if API fails
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