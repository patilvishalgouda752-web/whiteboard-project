import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, User } from '../types';
import { MessageSquare, Send, ChevronRight } from './Icon';

interface ChatSidebarProps {
  messages: ChatMessage[];
  currentUser: User;
  onSendMessage: (message: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ messages, currentUser, onSendMessage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-20 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
        title="Open Chat"
      >
        <MessageSquare />
      </button>
    );
  }

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-gray-50 dark:bg-gray-900 shadow-2xl z-20 flex flex-col border-l border-gray-200 dark:border-gray-700 transition-transform transform translate-x-0">
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Chat</h2>
        <button onClick={() => setIsOpen(false)} className="p-1 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ChevronRight />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.userId === currentUser.id ? 'justify-end' : ''}`}
            >
              {msg.userId !== currentUser.id && (
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold self-end"
                  style={{ backgroundColor: msg.userColor }}
                  title={msg.userName}
                >
                  {msg.userName.charAt(0)}
                </div>
              )}
              <div
                className={`max-w-[75%] p-3 rounded-lg ${
                  msg.userId === currentUser.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-transparent'
                }`}
              >
                {msg.userId !== currentUser.id && (
                  <p className="text-xs font-bold mb-1" style={{color: msg.userColor}}>{msg.userName}</p>
                )}
                <p className="text-sm break-words">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            disabled={!newMessage.trim()}
          >
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};