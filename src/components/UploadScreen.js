import React, { useState, useRef } from 'react';

function UploadScreen({ breed, onSubmit, onBack }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleSubmit = () => {
    if (uploadedImage) {
      onSubmit({
        image: uploadedImage,
        audio: audioBlob
      });
    }
  };

  return (
    <div className="upload-screen">
      <h1>📸 Show Me Your Drawing!</h1>
      <p style={{ fontSize: '24px', marginBottom: '30px' }}>
        Take a photo of your hand-drawn {breed.name} {breed.emoji}
      </p>

      <div className="upload-box">
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Upload Your Drawing</h2>

        <div className="upload-input-wrapper">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="upload-input"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="upload-label">
            📷 Take Photo or Choose File
          </label>
        </div>

        {uploadedImage && (
          <div>
            <img src={uploadedImage} alt="Your drawing" className="preview-image" />
          </div>
        )}

        <div className="voice-recorder">
          <h3>🎤 Optional: Record a Voice Memo</h3>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>
            Tell us about your drawing! (30 seconds max)
          </p>

          <button
            className={`record-button ${isRecording ? 'recording' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? '⏹ Stop Recording' : '🎤 Start Recording'}
          </button>

          {isRecording && (
            <div className="recording-time">
              Recording: {recordingTime}s / 30s
            </div>
          )}

          {audioBlob && !isRecording && (
            <div style={{ marginTop: '15px', color: '#10b981', fontSize: '18px', fontWeight: '600' }}>
              ✓ Voice memo recorded!
            </div>
          )}
        </div>
      </div>

      <div className="button-group">
        <button className="btn btn-back" onClick={onBack}>
          ← Back to Guide
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!uploadedImage}
        >
          Get AI Feedback! ✨
        </button>
      </div>
    </div>
  );
}

export default UploadScreen;