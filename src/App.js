import React, { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import GuidePage from './components/GuidePage';
import UploadScreen from './components/UploadScreen';
import FeedbackScreen from './components/FeedbackScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);

  const handleSelectBreed = (breed) => {
    setSelectedBreed(breed);
    setCurrentScreen('guide');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedBreed(null);
    setUploadedData(null);
  };

  const handleNextToUpload = () => {
    setCurrentScreen('upload');
  };

  const handleBackToGuide = () => {
    setCurrentScreen('guide');
    setUploadedData(null);
  };

  const handleSubmitDrawing = (data) => {
    setUploadedData(data);
    setCurrentScreen('feedback');
  };

  const handleTryAnother = () => {
    setCurrentScreen('home');
    setSelectedBreed(null);
    setUploadedData(null);
  };

  const handleDrawAgain = () => {
    setCurrentScreen('upload');
    setUploadedData(null);
  };

  return (
    <div className="App">
      {currentScreen === 'home' && (
        <HomeScreen onSelectBreed={handleSelectBreed} />
      )}

      {currentScreen === 'guide' && selectedBreed && (
        <GuidePage
          breed={selectedBreed}
          onNext={handleNextToUpload}
          onBack={handleBackToHome}
        />
      )}

      {currentScreen === 'upload' && selectedBreed && (
        <UploadScreen
          breed={selectedBreed}
          onSubmit={handleSubmitDrawing}
          onBack={handleBackToGuide}
        />
      )}

      {currentScreen === 'feedback' && selectedBreed && uploadedData && (
        <FeedbackScreen
          breed={selectedBreed}
          uploadedImage={uploadedData.image}
          onTryAnother={handleTryAnother}
          onDrawAgain={handleDrawAgain}
        />
      )}
    </div>
  );
}

export default App;
