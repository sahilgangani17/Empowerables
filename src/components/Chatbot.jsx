import React, { useState } from 'react';
import './Chatbot.css'; // Add a CSS file for styling, or style inline

const API_KEY = 'AIzaSyAbmXE7K5TaNTv0zT74WUXQoP8BJOFEezo'; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Predefined help list
  const helpQuestions = [
    "What is the difference between object detection and image classification?",
    "What are the limitations of current speech-to-text models?",
    "How can tone and emotion be conveyed in text-to-speech synthesis?",
    "What are some common challenges in simplifying fonts for diverse users?",
    "How can a PDF reader enhance accessibility for users with disabilities?",
    "How can gesture detection be used in user interfaces for improved accessibility?",
    "How can real-time feedback be incorporated into apps to improve accessibility for users with various impairments?"
  ];

  // Detailed answers to help questions
  const helpAnswers = [
    "Object detection identifies and locates objects in an image by drawing bounding boxes around them. Image classification only labels the image with one or more categories without locating the objects within the image.",

"Speech-to-text models struggle with accuracy in noisy environments, handling multiple speakers, and recognizing dialects or regional accents. They may also misinterpret homophones and technical or specialized vocabulary.",

"Tone and emotion can be conveyed through variations in pitch, speed, and intonation. These factors help the system adjust the speech output to reflect the intended mood, such as making the voice sound happy, sad, excited, or neutral.",

"Challenges include ensuring readability for different languages, accommodating various character sets, and balancing simplicity with legibility. Over-simplifying fonts can also make them less expressive or harder to read for some users.",

"A PDF reader can enhance accessibility by supporting screen readers, providing text-to-speech options, offering adjustable fonts and high-contrast modes, and simplifying complex layouts. It may also include navigation aids like keyboard shortcuts and alternative text for images.",

"Gesture detection enables users to interact with devices using physical movements such as swipes or taps, making it possible for those with motor impairments or those unable to use traditional input methods to control apps or devices.",

"Real-time feedback can be provided through audio signals, vibrations, or visual cues to alert users about actions, changes, or errors. For example, auditory feedback can help users with visual impairments, while haptic feedback can assist those with motor impairments."
  ];

  // Send message to AI or show help list if 'help' is entered
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    if (input.toLowerCase() === 'help') {
      // Show predefined help questions if 'help' is typed
      const helpMessage = helpQuestions.map((question, index) => {
        return `${index + 1}. ${question}`;
      }).join('\n');

      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'bot', content: 'Here are some questions you can ask about the website:\n' + helpMessage + '\nPlease choose a number from the list.' }
      ]);
      setIsLoading(false);
      return;
    }

    // If user enters a number for help, show detailed answer
    const helpNumber = parseInt(input.trim());
    if (helpNumber >= 1 && helpNumber <= helpQuestions.length) {
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'bot', content: helpAnswers[helpNumber - 1] }
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: input }], 
            role: 'user'
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 256
          }
        }),
      });

      const responseText = await response.text();
      console.log('Raw Response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Failed to parse API response');
      }

      if (response.ok) {
        if (data?.candidates && data.candidates.length > 0) {
          const botResponse = data.candidates[0]?.content?.parts?.[0]?.text || 'No response from AI';
          setMessages(prevMessages => [
            ...prevMessages, 
            { role: 'bot', content: botResponse }
          ]);
        } else {
          console.log('Unexpected API response structure:', data);
          setMessages(prevMessages => [
            ...prevMessages, 
            { role: 'bot', content: 'Unexpected response from AI' }
          ]);
        }
      } else {
        console.error('API Error:', data);
        const errorMessage = data.error?.message || 'Unknown API error';
        setMessages(prevMessages => [
          ...prevMessages, 
          { role: 'bot', content: `Error: ${errorMessage}` }
        ]);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'bot', content: `Network Error: ${error.message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior (newline in textarea)
      sendMessage(); // Call sendMessage on Enter key press
    }
  };

  return (
    <div className="chatbot-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}
          >
            <strong>{msg.role === 'user' ? 'You: ' : 'AI: '}</strong>
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div className="loading">AI is thinking...</div>
        )}
      </div>
      
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          rows={4}
          className="text-input"
          onKeyDown={handleKeyPress} // Listen for Enter key press
        />
        <button 
          onClick={sendMessage} 
          disabled={!input.trim() || isLoading}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
