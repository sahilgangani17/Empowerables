import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../utils/logo.png';
import Chatbot from './Chatbot'; // Assuming this is your chatbot component

export const Navbar = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  // Function to open/close chatbot modal
  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <Link to='/'>
            <img src={logo} alt="" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/Services'>Services</Link>
          </li>
          <li>
            <Link to='/AboutUs'>About Us</Link>
          </li>
          <li>
            <Link to='/Demo'>Demo</Link>
          </li>
          <li>
            <Link to='/ContactUs'>Contact</Link>
          </li>
        </ul>
        <div className="help">
          {/* Update this to toggle the chatbot on button click */}
          <a href="#" onClick={toggleChatbot}>Need help?</a>
        </div>
        <div className="navbar-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <div className="chatbot-modal">
          <span className="close-button" onClick={toggleChatbot}>&times;</span>
          <Chatbot /> {/* Your chatbot component */}
        </div>
      )}

      <style jsx>{`
        .chatbot-modal {
          display: flex;
          position: fixed;
          z-index: 1000;
          right: 0;
          top: 20%;
          width: 300px;
          height: auto;
          background-color: rgba(0, 0, 0, 0.5);
          justify-content: flex-end;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          width: 100%;
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};
