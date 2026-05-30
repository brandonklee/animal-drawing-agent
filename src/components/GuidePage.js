import React from 'react';

function GuidePage({ breed, onNext, onBack }) {
  return (
    <div className="guide-page">
      <div className="guide-header">
        <h1>How to Draw a {breed.name}! {breed.emoji}</h1>
      </div>

      <div className="guide-content">
        <div className="reference-section">
          <h2>📸 Reference Image</h2>
          <img
            src={breed.referenceImage}
            alt={breed.name}
            className="reference-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div style={{ display: 'none', padding: '20px', background: '#fee2e2', borderRadius: '10px', marginTop: '10px' }}>
            Image couldn't load, but follow the steps below!
          </div>
        </div>

        <div className="instructions-section">
          <h2>✏️ Step-by-Step Guide</h2>
          <ol className="steps-list">
            {breed.steps.map((step, index) => (
              <li key={index} className="step-item">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="button-group">
        <button className="btn btn-back" onClick={onBack}>
          ← Back to Animals
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          Ready to Draw! 🎨
        </button>
      </div>
    </div>
  );
}

export default GuidePage;