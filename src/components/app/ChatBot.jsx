import React, { useState, useRef, useEffect } from 'react';
import { chat } from '../../assets';
import { responsesMap } from '../../constants';

const quickResponses = [
  "How to book an appointment?",
  "What are your clinic hours?",
  "Do you accept walk-ins?",
  "Can I cancel my appointment?",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(prev => !prev);

  const sendMessage = (text, isUser = true) => {
    setMessages(prev => [...prev, { text, isUser }]);
  };

  const handleUserMessage = () => {
    if (!input.trim()) return;
    sendMessage(input);
    handleBotResponse(input);
    setInput('');
  };

  const handleBotResponse = (userText) => {
    const reply = responsesMap[userText] || "Let me check on that and get back to you.";
    setTimeout(() => sendMessage(reply, false), 500);
  };

  const handleQuickResponse = (text) => {
    sendMessage(text);
    handleBotResponse(text);
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div>
      <button onClick={toggleChat} className="chat-fab">
        <img src={chat} alt="" />
      </button>

      <div className={`chat-container ${isOpen ? "open-animate" : ""}`}>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.isUser ? 'chat-bubble user' : 'chat-bubble bot'}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-quick-buttons">
          <p>FAQ</p>
          {quickResponses.map((text, idx) => (
            <button key={idx} className="chat-quick-button" onClick={() => handleQuickResponse(text)}>
              {text}
            </button>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUserMessage()}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={handleUserMessage} className="chat-send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
