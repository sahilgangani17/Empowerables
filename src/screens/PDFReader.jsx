// export default PDFReader;
import { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { Navbar } from "../components/Navbar";
import './PDFReader.css';

// Use PDF.js directly from a CDN
const pdfjsLib = window['pdfjs-dist/build/pdf'];

const PDFReader = () => {
  const [text, setText] = useState("");
  const [pitch, setPitch] = useState(1); // Default pitch value
  const [rate, setRate] = useState(1); // Default rate value
  const { speak, cancel, speaking } = useSpeechSynthesis();

  const handleSpeakClick = () => {
    if (text) {
      speak({ text, pitch: parseFloat(pitch), rate: parseFloat(rate) });
    } else {
      alert("No text available to speak.");
    }
  };

  const handleStopClick = () => {
    cancel(); // Stops the speech synthesis
  };

  const extractTextFromPDF = (file) => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const typedArray = new Uint8Array(e.target.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(" ");
        extractedText += pageText + " ";
      }

      setText(extractedText); // Set the extracted text to display it
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      extractTextFromPDF(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pdf-reader">
        <h1>PDF Reader</h1>

        {/* Card Container */}
        <div className="cardd">
          {/* File input to upload PDF */}
          <input
            type="file"
            className="input-filee"
            accept="application/pdf"
            onChange={handleFileChange}
          />

          {/* Pitch input */}
          <label htmlFor="pitch">Pitch:</label>
          <input
            type="number"
            id="pitch"
            value={pitch}
            min="0"
            max="2"
            step="0.1"
            onChange={(e) => setPitch(e.target.value)}
          />

          {/* Rate input */}
          <label htmlFor="rate">Rate:</label>
          <input
            type="number"
            id="rate"
            value={rate}
            min="0.1"
            max="10"
            step="0.1"
            onChange={(e) => setRate(e.target.value)}
          />

          {/* Speak and Stop buttons */}
          <button className="button" onClick={handleSpeakClick} disabled={speaking}>
            Speak
          </button>
          <button className="button stop-button" onClick={handleStopClick} disabled={!speaking}>
            Stop
          </button>
        </div>

        {/* Text Display Container */}
        <div className="text-display">
          <h2>Extracted Text:</h2>
          <textarea
            value={text}
            readOnly
            rows={10}
            cols={50}
            placeholder="Uploaded PDF's text will appear here..."
          />
        </div>
      </div>
    </>
  );
};

export default PDFReader;