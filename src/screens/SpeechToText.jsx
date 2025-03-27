import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { Navbar } from "../components/Navbar";
import "./SpeechToText.css"; // Import the CSS file

function SpeechToText() {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("en-IN");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
    language: language,
  });

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <><Navbar />
    <div className="stt-container">
      <div className="stt-content">
        <h1 className="stt-title">Speech To Text</h1>
        
      

        <textarea
          className="stt-textarea"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        <button
          className="stt-speak-btn"
          onMouseDown={listen}
          onMouseUp={stop}
        >
          🎤 Hold to Speak
        </button>

        {listening && (
          <div className="stt-listening-status">Go ahead, I'm listening...</div>
        )}
      </div>
    </div>
    </>
  );
}

export default SpeechToText;
