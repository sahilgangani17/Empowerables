import { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { Navbar } from "../components/Navbar";
import "./TextToSpeech.css";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const { speak } = useSpeechSynthesis();
  const handleClick = () => {
    speak({ text: text });
  };

  return (
    <><Navbar />
    <div className="tts-container">
       {/* This should now align properly */}

      <div className="tts-content">
        <h1 className="tts-title">Text To Speech</h1>
        <textarea
          className="tts-input"
          rows="10"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter text here..."
        ></textarea>
        <div className="tts-controls">
          <button className="tts-speak-btn" onClick={handleClick}>
            <i className="fa fa-microphone"></i>
            Speak
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default TextToSpeech;
