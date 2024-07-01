import React from 'react';
import { DeepChat } from 'deep-chat-react';

const Chat = () => {
  const initialMessages = [
    { role: 'user', text: 'Hey, how are you today?' },
    { role: 'ai', text: 'I am doing very well!' },
  ];

  return (
    <div className="h-full flex-1 w-full flex justify-center flex-col bg-gray-900 items-center">
      <h1 className="text-white mb-4"></h1>
      <DeepChat
      
        demo={true}
        style={{ height: '100%', width: '100%', backgroundColor: '#111827', border: 'none', borderRadius: '0' }}
        textInput={{
          placeholder: { text: 'Welcome to the demo!' },
          "styles": {
            "text": {"color": "black"},
            "container": {"maxHeight": "100px", "backgroundColor": "#f5f9ff" , "padding":"20px" , "borderRadius":"50px" },
            "focus": {"border": "2px solid #a2a2ff"}
            
          },
          

        }}

        
        initialMessages={initialMessages}
      />
    </div>
  );
}

export default Chat;
