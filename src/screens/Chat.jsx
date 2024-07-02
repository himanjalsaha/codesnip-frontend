import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import { CodeBlock, dracula } from 'react-code-blocks';
import remarkGfm from 'remark-gfm';
import Loader from '../components/Loader';


const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Welcome! How can I assist you?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = { role: 'user', text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');

    // Add an AI placeholder message
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'ai', text: '', isPlaceholder: true }
    ]);

    try {
      setLoading(true);
      const response = await axios.post('https://codesnips-backend.onrender.com/chat', {
        message: inputMessage
      });
      setLoading(false);

      const aiMessage = { role: 'ai', text: response.data.response };
      // Remove the placeholder and add the actual AI message
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        aiMessage
      ]);

      // Extract and store code blocks from AI response
      extractAndStoreCodeBlocks(aiMessage.text);
    } catch (error) {
      console.error('Error creating chat completion:', error);
      console.log('Error response data:', error.response.data);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { role: 'system', text: 'Error creating chat completion.' }
      ]);
      setLoading(false);
    }
  };

  const isCode = (text) => {
    // Regular expression to match code blocks surrounded by triple backticks
    const codeBlockRegex = /^```[\s\S]*```$/;

    // Check if the text matches the code block regex
    return codeBlockRegex.test(text.trim());
  };

  const extractAndStoreCodeBlocks = (responseText) => {
    // Regular expression to find code blocks
    const codeBlockRegex = /```([\s\S]*?)```/g;
    let match;
    
    while ((match = codeBlockRegex.exec(responseText)) !== null) {
      const codeText = match[1];
      // Here you can store or process each code block as needed
      console.log('Found code block:', codeText);
      // Example: You might want to save it to state or perform other operations
    }
  };

  return (
    <div className="flex flex-col flex-1 h-screen w-screen bg-gray-900">
      <div className="flex-1 h-screen w-full overflow-y-auto px-6 py-8">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex mb-4 ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`p-4 rounded-lg max-w-full text-white shadow-md text-wrap ${
                msg.role === 'ai' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-400 to-green-500 self-end'
              }`}
            >
              {msg.isPlaceholder ? (
                <Loader />
              ) : isCode(msg.text) ? (
                <CodeBlock text={msg.text} theme={dracula} />
              ) : (
                <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
              )}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4">
        <div className="flex items-center rounded-lg bg-gray-800 shadow-md">
          <textarea
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-1 py-3 px-4 rounded-lg bg-transparent text-white focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-3 rounded-lg ml-3 hover:bg-blue-600 transition duration-200"
          >
            Send
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
