import React from 'react';
import ChatBubble from '../components/ChatBubble'; // Change to ChatBubble
import Bot from '../components/Bot'; // Change to Bot
import { Navbar } from '../components/Navbar';

export const Chat = () => {
  return (
    <div>
      <Navbar />
      {/* You can use ChatBubble or Bot here based on your requirement */}
      <ChatBubble />
      {/* Or you can use the Bot component */}
      {/* <Bot setChatActive={() => {}} /> */}
    </div>
  );
};
