import React, { useRef, useEffect } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../utils/utilities";  // Ensure this draws rectangles around objects
import { Navbar } from "../components/Navbar";

// Function for text-to-speech
const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

function ObjectDetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const detectedObjectsRef = useRef(new Set()); // To store objects detected and avoid repeating alerts

  const runCoco = async () => {
    const net = await cocossd.load();
    setInterval(() => {
      detect(net);
    }, 3000); // Detect every 3 seconds to give time for audio feedback
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video and canvas dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Detect objects in the video frame
      const obj = await net.detect(video);

      // Get the drawing context on the canvas
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); // Draw rectangles around detected objects

      // Announce objects using text-to-speech
      if (obj.length > 0) {
        obj.forEach((prediction) => {
          const objectClass = prediction.class;

          // If the object was not announced recently, announce it
          if (!detectedObjectsRef.current.has(objectClass)) {
            detectedObjectsRef.current.add(objectClass);
            speak(`Be careful, there is a ${objectClass} ahead.`);
          }
        });

        // Clear the detected objects list every 10 seconds to avoid repetitive speech
        setTimeout(() => detectedObjectsRef.current.clear(), 10000);
      }
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="bg-green-200 min-h-screen">
      <Navbar />
      <h1 className="text-5xl font-semibold mt-12 mb-8">Object Detection with Audio Alerts</h1>
      <div className="flex justify-center items-center h-[70vh]">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 840,
            height: 580,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 780,
            height: 500,
          }}
        />
      </div>
    </div>
  );
}

export default ObjectDetection;
