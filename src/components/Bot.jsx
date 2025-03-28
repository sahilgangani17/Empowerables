// import React, { useState } from 'react';
// import { Button, TextInput, Alert } from 'react-bootstrap';
// import { useEffect } from 'react';
// import ChatBot from 'react-chatbotify';

// const API_KEY = 'Replace with your actual API key'; // Ensure this is your actual API key
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// const Bot = ({ setChatActive }) => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [{
//             parts: [{ text: input }],
//             role: 'user'
//           }],
//           generationConfig: {
//             temperature: 0.7,
//             maxOutputTokens: 256
//           }
//         }),
//       });

//       const responseText = await response.text();
//       console.log('Raw Response:', responseText);

//       let data;
//       try {
//         data = JSON.parse(responseText);
//       } catch (parseError) {
//         console.error('JSON Parse Error:', parseError);
//         throw new Error('Failed to parse API response');
//       }

//       if (response.ok) {
//         if (data?.candidates && data.candidates.length > 0) {
//           const botResponse = data.candidates[0]?.content?.parts?.[0]?.text || 'No response from AI';
//           setMessages(prevMessages => [
//             ...prevMessages,
//             { role: 'bot', content: botResponse }
//           ]);
//         } else {
//           console.log('Unexpected API response structure:', data);
//           setMessages(prevMessages => [
//             ...prevMessages,
//             { role: 'bot', content: 'Unexpected response from AI' }
//           ]);
//         }
//       } else {
//         const errorMessage = data.error?.message || 'Unknown API error';
//         setMessages(prevMessages => [
//           ...prevMessages,
//           { role: 'bot', content: `Error: ${errorMessage}` }
//         ]);
//         Alert.alert('API Error', errorMessage);
//       }
//     } catch (error) {
//       console.error('Fetch Error:', error);
//       setMessages(prevMessages => [
//         ...prevMessages,
//         { role: 'bot', content: `Network Error: ${error.message}` }
//       ]);
//       Alert.alert('Network Error', 'Unable to connect to the AI service. Please check your internet connection.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const flow = {
//     start: {
//       message: "How may I help you? \nType 'help' to view help menu",
//       path: "chooseService"
//     },

//     chooseService: {
//       message: (params) => {
//         if (params.userInput === "help") {
//           return `Choose from our services: \n1. Object Detection \n2. Speech-to-Text \n3. Text-to-Speech \n4. Font Simplifier \n5. PDF Reader \n6. Gesture Detection \n7. General Queries`;
//         } else {
//           return "Sorry, I can only assist if you type 'help'.";
//         }
//       },
//       path: "serviceChosen"
//     },

//     serviceChosen: {
//       message: (params) => {
//         switch (params.userInput) {
//           case "1":
//             return "You've selected Object Detection. Do you want to learn how it works? (yes/no)";
//           case "2":
//             return "You've selected Speech-to-Text. Do you want to see a demo or learn more about this feature? (demo/more)";
//           case "3":
//             return "You've selected Text-to-Speech. What kind of text do you want to convert? (pdf/article/other)";
//           case "4":
//             return "You've selected Font Simplifier. Do you want to apply it to a document? (yes/no)";
//           case "5":
//             return "You've selected PDF Reader. Would you like to upload a PDF or read instructions first? (upload/instructions)";
//           case "6":
//             return "You've selected Gesture Detection. Do you want to try a live demo? (yes/no)";
//           case "7":
//             return "You've selected General Queries. What would you like to ask?";
//           default:
//             return "Please choose a valid option (1-7).";
//         }
//       },
//       path: "serviceFollowUp"
//     },

//     serviceFollowUp: {
//       message: (params) => {
//         if (params.userInput === "yes") {
//           return "Great! Let me show you how it works...";
//         } else if (params.userInput === "no") {
//           return "Okay, feel free to ask anything else.";
//         } else if (params.userInput === "demo") {
//           return "Here's a quick demo...";
//         } else if (params.userInput === "more") {
//           return "Speech-to-Text converts spoken language into text using AI. It is widely used in dictation, virtual assistants, and accessibility features.";
//         } else if (params.userInput === "pdf" || params.userInput === "article" || params.userInput === "other") {
//           return `You've selected ${params.userInput}. Initiating conversion...`;
//         } else if (params.userInput === "upload") {
//           return "Please upload your PDF file.";
//         } else if (params.userInput === "instructions") {
//           return "To use the PDF reader, simply upload your file and the bot will read it aloud for you.";
//         } else {
//           return "Thank you for interacting!";
//         }
//       },
//       path: "end"
//     },

//     end: {
//       message: "-- Thank you for using our services! --",
//       chatDisabled: true
//     }
//   };

//   const settings = {
//     general: {
//       embedded: true,
//     },
//     chatHistory: {
//       storageKey: "anystorage_key"
//     }
//   };

//   return (
//     <div style={{display: "flex", flexDirection:"column", justifyContent: "end", alignItems: "end"}}>
//       <ChatBot flow={flow} settings={settings} />
//       <div onClick={() => setChatActive(false)} style={{ padding: 10, width: "22rem", marginTop: "1rem", borderRadius: "0.5rem", textAlign: "center", backgroundColor: "#42b0c5", color: "white" }}>
//         Close Chat
//       </div>
//     </div>
//   );
// }

// export default Bot;
