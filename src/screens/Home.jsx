import { useState } from 'react';
//import { Demo } from "../components/Demo";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Services } from "../components/Services";
import { Slider } from "../components/Slider";
import { Steps } from "../components/Steps";
//import { useState } from 'react'; // Import useState for managing chat state
import Bot from '../components/Bot'; // Adjust path if necessary
import ChatBubble from '../components/ChatBubble'; // Adjust path if necessary

export const Home = () => {
  const [chatActive, setChatActive] = useState(false);

  return (
    <div>
      <Navbar />
      <Slider />
      <Services />
       {/* <Demo /> */}
      <Steps />
      <Footer />

      {/* Chatbot Integration */}
      <div id="chat-container">
        {
          chatActive ? (
            <Bot setChatActive={setChatActive} />
          ) : (
            <div onClick={() => setChatActive(!chatActive)}>
              <ChatBubble />
            </div>
          )
        }
      </div>
    </div>
  )
}
