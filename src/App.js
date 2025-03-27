import "./App.css";
// import Login from "./screens/Login";
// import SignUp from "./screens/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Services } from "./components/Services.jsx";
import {Demo} from './components/Demo.jsx';
import ObjectDetection from "./screens/ObjectDetection";
import {SignOption} from "./screens/SignOption.jsx";
import SpeechToText from "./screens/SpeechToText";
import TextToSpeech from "./screens/TextToSpeech";
import PDFReader from "./screens/PDFReader";
import { Home } from './screens/Home.jsx';
import {AboutUs} from "./screens/AboutUs.jsx";
import {ContactUs} from './screens/ContactUs.jsx';
import { VisuallyImpaired } from "./screens/VisuallyImpaired";
import { DeafDumb } from "./screens/DeafDumb";
import { Dyslexia } from "./screens/Dyslexia";
import { DyslexiaReader } from "./screens/DyslexiaReader";
import { Chat } from "./screens/Chat";
import SimpleForm from "./components/Bot.jsx";
import SignDetection from "./screens/SignDetection";
import SignLanguageDetection from "./screens/SignLanguageDetection";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route path="/" element={<Home />} />  
          <Route path="/Services" element={<Services />} />  
          <Route path="/Demo" element={<Demo />} />  
          <Route path="/aboutUs" element={<AboutUs />} />  
          <Route path="/signOption" element={<SignOption />} />
          <Route path="/contactUs" element={<ContactUs />} />   
          <Route path="/chatbot" element={<SimpleForm />} />
          <Route path="/visually_impaired" element={<VisuallyImpaired />} />   
          <Route path="/deaf_and_dumb" element={<DeafDumb />} />   
          <Route path="/dyslexia" element={<Dyslexia />} />   
          <Route path="/dyslexia_reader" element={<DyslexiaReader />} />   
          <Route path="/pdf_reader" element={<PDFReader />} />   
          <Route path="/speech_to_text" element={<SpeechToText />} />   
          <Route path="/text_to_speech" element={<TextToSpeech />} />   
          <Route path="/object_detection" element={<ObjectDetection />} />     
          <Route path="chat" element={<Chat />} />   
          <Route path="/sign_language_detection" element={<SignDetection />} />
          <Route path="/sign_language_detection2" element={<SignLanguageDetection />} /> 

           
        </Routes>
      </Router>
    </div>
  );
}

export default App;