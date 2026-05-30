import React, { useState, useEffect } from 'react';
import { analyzeDrawing } from '../services/claudeService';

function FeedbackScreen({ breed, uploadedImage, onTryAnother, onDrawAgain }) {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await analyzeDrawing(uploadedImage, breed.name);
        setFeedback(result);
      } catch (err) {
        console.error('Error getting feedback:', err);
        setError('Oops! Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [uploadedImage, breed.name]);

  if (loading) {
    return (
      <div className="feedback-screen">
        <div className="loading">
          <h2>🤔 AI is looking at your drawing...</h2>
          <div className="loading-spinner"></div>
          <p>This might take a few seconds!</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feedback-screen">
        <h1>AI Feedback</h1>
        <div className="error-message">
          {error}
        </div>
        <div className="button-group">
          <button className="btn btn-primary" onClick={onDrawAgain}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-screen">
      <h1>✨ Your Drawing Feedback! ✨</h1>

      <div className="feedback-content">
        <div className="uploaded-preview">
          <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Your {breed.name} Drawing</h3>
          <img src={uploadedImage} alt="Your drawing" />
        </div>

        <div className="ai-feedback">
          <div dangerouslySetInnerHTML={{ __html: feedback }} />
        </div>
      </div>

      <div className="button-group">
        <button className="btn btn-secondary" onClick={onTryAnother}>
          🎨 Try Another Breed
        </button>
        <button className="btn btn-primary" onClick={onDrawAgain}>
          ✏️ Draw {breed.name} Again
        </button>
      </div>
    </div>
  );
}

export default FeedbackScreen;