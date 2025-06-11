import { Booking } from '@/types/BookingTypes';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // match your backend server

type OperatorChatBoxProps = {
  onClose: () => void;
  booking: Booking;
};

const OperatorChatBox = ({ onClose, booking }: OperatorChatBoxProps) => {
  const [messages, setMessages] = useState<{ senderId: string; message: string; timestamp?: string }[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const bookingId = booking._id;
  const operatorId = booking.tour_operator?._id;

  useEffect(() => {
    // Join booking room
    socket.emit('joinBookingChat', { bookingId });

    // Receive messages
    socket.on('receiveChatMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveChatMessage');
    };
  }, [bookingId]);

  const handleSend = () => {
    if (!input.trim()) return;

    const messageObj = {
      bookingId,
      senderId: operatorId,
      message: input
    };

    // Emit to socket server
    socket.emit('sendChatMessage', messageObj);

    // Update UI immediately
    setMessages((prev) => [...prev, { senderId: operatorId, message: input }]);
    setInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-md flex justify-center items-center z-50">
      <div className="w-[400px] h-[600px] flex flex-col border shadow-lg rounded-md overflow-hidden bg-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-2xl"
        >
          &times;
        </button>

        <div className="bg-blue-500 text-white px-4 py-2 font-semibold">
          Chat with {booking.user}
        </div>

        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.senderId === operatorId ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] text-sm ${
                  msg.senderId === operatorId ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="border-t px-4 py-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorChatBox;
