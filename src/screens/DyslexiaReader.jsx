import React, { useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import { Navbar } from '../components/Navbar';
import './DyslexiaReader.css'; // Import the CSS file

// Image preprocessing function to improve OCR results
function preprocessImage(canvas) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Simple grayscale conversion
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;      // Red
    data[i + 1] = avg;  // Green
    data[i + 2] = avg;  // Blue
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export const DyslexiaReader = () => {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);  // Add processing state
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  const handleClick = () => {
    setIsProcessing(true);  // Start processing
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = imageRef.current;

    // Set canvas dimensions to match image dimensions
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw image to canvas and preprocess it
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    preprocessImage(canvas);  // Grayscale preprocessing

    // Convert canvas to data URL (PNG format to preserve quality)
    const dataUrl = canvas.toDataURL("image/png");

    // Start OCR with Tesseract.js
    Tesseract.recognize(
      dataUrl, 'eng',
      { logger: m => console.log(m) } // Log the progress
    )
    .then(result => {
      let extractedText = result.data.text;
      setText(extractedText);
      console.log(extractedText);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setIsProcessing(false);  // End processing
    });
  }

  return (
    <div className="dyslexia-reader">
      <Navbar />
      <main className="p-6">
        <h1>Dyslexia Reader</h1>
        <div className="uploaded-container flex mt-4">
          <div className="uploaded-image card">
            <h3>Uploaded Image</h3>
            {image && (
              <img 
                src={image} 
                alt="Uploaded" 
                ref={imageRef} 
                className="rounded-md"
                width={700} 
                height={350} 
              />
            )}
          </div>
          <div className="canvas-container card">
            <h3>Canvas</h3>
            <canvas ref={canvasRef} className="canvas"></canvas>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-6">
  <h3>Extracted Text</h3>
  <div className="text-extracted">
    <h1 className='text-xl font-body text-[#0F092D]'>
      {text}
    </h1>
  </div>
</div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-6">
          <input 
            type="file" 
            onChange={handleChange} 
            className="input-file"
          />
          <button 
            className='button'
            onClick={handleClick}
            disabled={isProcessing}  // Disable button while processing
          >
            {isProcessing ? 'Processing...' : 'Convert to Text'}
          </button>
        </div>
      </main>
    </div>
  );
}
