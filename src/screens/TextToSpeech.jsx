import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { Navbar } from "../components/Navbar";
import "./TextToSpeech.css";

// Language configurations (use appropriate language codes for TTS)
const LANGUAGES = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'ru-RU', name: 'Russian' }
];

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en-US");
  const [targetLanguage, setTargetLanguage] = useState("es-ES");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [voices, setVoices] = useState([]);

  const { speak, cancel, speaking } = useSpeechSynthesis();

  // Get available voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      console.log("Available Voices:", availableVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // MyMemory Translation API function (for demonstration)
  const translateText = async (text, targetLang) => {
    if (!text) return "";
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLang}`
      );
      const data = await response.json();
      if (data && data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      console.error("Translation error:", err);
      return `[Translation failed to ${targetLang}] ${text}`;
    }
  };

  // Handle text translation
  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);
    setError(null);
    try {
      const translated = await translateText(text, targetLanguage);
      setTranslatedText(translated);
    } catch (err) {
      setError("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to get a matching voice based on target language
  const getVoiceForLanguage = (langCode) => {
    // Try to find a voice that matches the target language code exactly
    const matchingVoice = voices.find((voice) => voice.lang === langCode);
    // Fallback: try a voice that starts with the language (e.g., 'hi' for 'hi-IN')
    if (!matchingVoice) {
      return voices.find((voice) => voice.lang.startsWith(langCode.split("-")[0])) || voices[0];
    }
    return matchingVoice;
  };

  // Speak translated text
  const handleSpeak = () => {
    if (speaking) {
      cancel();
      return;
    }
    const textToSpeak = translatedText || text;
    const selectedVoice = getVoiceForLanguage(targetLanguage);
    console.log("Speaking with voice:", selectedVoice);
    speak({
      text: textToSpeak,
      opts: {
        lang: targetLanguage,
        voice: selectedVoice,
        rate: 1,    // You can adjust rate if needed
        pitch: 1,   // Adjust pitch if needed
      },
    });
  };

  // Auto-translate when text, source language, or target language changes
  useEffect(() => {
    const delayTranslation = setTimeout(() => {
      if (text) {
        handleTranslate();
      }
    }, 500);
    return () => clearTimeout(delayTranslation);
  }, [text, sourceLanguage, targetLanguage]);

  return (
    <>
      <Navbar />
      <div className="tts-container">
        <div className="tts-content">
          <h1 className="tts-title">Multilingual Text-to-Speech Translator</h1>
          {/* Language Selection */}
          <div className="language-selectors">
            <div>
              <label>Source Language:</label>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="tts-language-select"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Target Language:</label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="tts-language-select"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Input Textarea */}
          <textarea
            className="tts-input"
            rows="6"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Enter text to translate and speak..."
          ></textarea>
          {/* Translated Text Display */}
          <div className="tts-translated-output">
            <h3>Translated Text:</h3>
            {loading ? (
              <p>Translating...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p>{translatedText || "Translation will appear here"}</p>
            )}
          </div>
          {/* Control Buttons */}
          <div className="tts-controls">
            <button
              className="tts-speak-btn"
              onClick={handleSpeak}
              disabled={loading}
            >
              <i className={`fa ${speaking ? "fa-stop" : "fa-microphone"}`}></i>
              {speaking ? "Stop" : "Speak"}
            </button>
            <button
              className="tts-translate-btn"
              onClick={handleTranslate}
              disabled={loading}
            >
              <i className="fa fa-language"></i>
              Translate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextToSpeech;
