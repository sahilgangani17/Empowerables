import React, { useRef, useEffect, useState } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../utils/utilities";
import { Navbar } from "../components/Navbar";

// Enhanced speech function with more robust speaking
const speak = (text) => {
  if ('speechSynthesis' in window) {
    try {
      if (!text || text.trim() === '') return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Optimized speech parameters
      utterance.rate = 0.6;  // Slower for clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Attempt to use a clear, slow voice
      const voices = window.speechSynthesis.getVoices();
      const clearVoice = voices.find(voice =>
        voice.lang.includes('en') &&
        (voice.name.includes('Karen') || voice.name.includes('Daniel'))
      );
      if (clearVoice) utterance.voice = clearVoice;

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech Synthesis Error:', error);
    }
  }
};

function AccessibleObjectDetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const detectedObjectsRef = useRef(new Set());
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [debugInfo, setDebugInfo] = useState({
    speechSupported: 'Checking...',
    navigationGuidance: '',
    detectionErrors: []
  });

  // Improved horizontal positioning with more granular detection
  const getHorizontalPosition = (bbox, videoWidth) => {
    const objectCenterX = bbox[0] + bbox[2] / 2;
    const screenWidth = videoWidth;
    const zones = [
      { name: 'far left', range: [0, screenWidth * 0.2] },
      { name: 'left', range: [screenWidth * 0.2, screenWidth * 0.4] },
      { name: 'center left', range: [screenWidth * 0.4, screenWidth * 0.6] },
      { name: 'center', range: [screenWidth * 0.6, screenWidth * 0.8] },
      { name: 'right', range: [screenWidth * 0.8, screenWidth] }
    ];

    const foundZone = zones.find(zone =>
      objectCenterX >= zone.range[0] && objectCenterX < zone.range[1]
    );

    return foundZone ? foundZone.name : 'unknown';
  };

  // Enhanced proximity detection
  const getProximity = (bbox, videoWidth, videoHeight) => {
    const objectArea = bbox[2] * bbox[3];
    const screenArea = videoWidth * videoHeight;
    const objectRatio = objectArea / screenArea;

    if (objectRatio > 0.5) return 'extremely close';
    if (objectRatio > 0.3) return 'very close';
    if (objectRatio > 0.15) return 'nearby';
    if (objectRatio > 0.05) return 'moderate distance';
    return 'far away';
  };

  const runCoco = async () => {
    try {
      setDebugInfo(prev => ({
        ...prev,
        speechSupported: 'speechSynthesis' in window ? 'Supported' : 'Not Supported'
      }));

      const net = await cocossd.load();
      speak("Object detection system activated. Scanning environment.");

      // Continuous detection with improved interval
      setInterval(() => {
        detect(net);
      }, 2000); // Reduced interval for more frequent updates
    } catch (error) {
      console.error("Model loading error:", error);
      setDebugInfo(prev => ({
        ...prev,
        detectionErrors: [...prev.detectionErrors, error.message]
      }));
    }
  };

  const detect = async (net) => {
    try {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        // Prepare canvas
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Detect objects with improved confidence
        const obj = await net.detect(video, 5, 0.5); // Detect up to 5 objects with 50% confidence
        const ctx = canvasRef.current.getContext("2d");
        drawRect(obj, ctx);

        // Process detected objects
        if (obj.length > 0) {
          const newDetections = obj.map((prediction) => {
            const objectClass = prediction.class;
            const bbox = prediction.bbox;
            const confidence = Math.round(prediction.score * 100);

            // Determine object position and proximity
            const horizontalPos = getHorizontalPosition(bbox, videoWidth);
            const proximity = getProximity(bbox, videoWidth, videoHeight);

            // Create detailed navigation guidance
            const navigationText = `${objectClass} detected on the ${horizontalPos}, ${proximity}, ${confidence}% confidence.`;

            // Speak guidance for new objects
            if (!detectedObjectsRef.current.has(objectClass)) {
              detectedObjectsRef.current.add(objectClass);
              speak(navigationText);
            }

            return {
              class: objectClass,
              position: horizontalPos,
              proximity: proximity,
              confidence: confidence
            };
          });

          // Update detected objects state
          setDetectedObjects(newDetections);

          // Update debug info
          setDebugInfo(prev => ({
            ...prev,
            navigationGuidance: newDetections.map(obj =>
              `${obj.class} on ${obj.position}`
            ).join(', ')
          }));

          // Clear detected objects periodically
          setTimeout(() => detectedObjectsRef.current.clear(), 10000);
        }
      }
    } catch (error) {
      console.error("Detection error:", error);
      setDebugInfo(prev => ({
        ...prev,
        detectionErrors: [...prev.detectionErrors, error.message]
      }));
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="bg-green-200 min-h-screen relative">
      <Navbar />
      <h1 className="text-5xl font-semibold text-center py-6">
        Assistive Object Detection
      </h1>

      {/* Full-screen webcam container */}
      <div className="w-full h-[calc(100vh-200px)] relative">
        <Webcam
          ref={webcamRef}
          muted={true}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />

        {/* Detected Objects Overlay */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Detected Objects:</h2>
          {detectedObjects.length > 0 ? (
            <ul className="space-y-1">
              {detectedObjects.map((obj, index) => (
                <li key={index} className="flex justify-between">
                  <span>{obj.class}</span>
                  <span className="text-green-300">
                    {obj.position} | {obj.proximity} | {obj.confidence}%
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No objects detected</p>
          )}
        </div>
      </div>

      {/* Debug Information Panel */}
      <div className="fixed top-20 right-4 bg-white p-4 rounded shadow-lg z-50">
        <h2 className="font-bold mb-2">Navigation Assistance</h2>
        <p>Speech: {debugInfo.speechSupported}</p>
        <p className="font-semibold text-green-600">Current Guidance:</p>
        <p>{debugInfo.navigationGuidance || 'No current guidance'}</p>
        {debugInfo.detectionErrors.length > 0 && (
          <div>
            <h3 className="font-semibold mt-2 text-red-500">Errors:</h3>
            {debugInfo.detectionErrors.map((error, index) => (
              <p key={index} className="text-red-500">{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AccessibleObjectDetection;
