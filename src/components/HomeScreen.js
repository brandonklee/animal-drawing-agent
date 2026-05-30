import React from 'react';
import { breeds } from '../data/breeds';

function HomeScreen({ onSelectBreed }) {
  return (
    <div className="home-screen">
      <h1>🎨 Animal Drawing Agent</h1>

      <div className="breeds-section">
        <h2>🐕 Dogs</h2>
        <div className="breeds-grid">
          {breeds.dogs.map(breed => (
            <div
              key={breed.id}
              className="breed-card"
              onClick={() => onSelectBreed(breed)}
            >
              <div className="breed-emoji">{breed.emoji}</div>
              <div className="breed-name">{breed.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="breeds-section">
        <h2>🐈 Cats</h2>
        <div className="breeds-grid">
          {breeds.cats.map(breed => (
            <div
              key={breed.id}
              className="breed-card"
              onClick={() => onSelectBreed(breed)}
            >
              <div className="breed-emoji">{breed.emoji}</div>
              <div className="breed-name">{breed.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;