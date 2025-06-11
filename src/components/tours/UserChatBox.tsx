
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Booking } from '@/types/BookingTypes';

type UserChatBoxProps = {
  onClose: () => void;
  booking: Booking;
  userId: string;
};

const socket = io('http://localhost:5000'); 

const UserChatBox = ({ onClose, booking, userId }: UserChatBoxProps) => {
  const [messages, setMessages] = useState<
    { senderId: string; message: string; timestamp: string }[]
  >([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!booking?._id) return;

    socket.emit('joinBookingChat', { bookingId: booking._id });

    socket.on('receiveChatMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveChatMessage');
    };
  }, [booking?._id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      bookingId: booking._id,
      senderId: userId,
      message: input,
    };

    socket.emit('sendChatMessage', newMessage);
    setMessages((prev) => [
      ...prev,
      { ...newMessage, timestamp: new Date().toISOString() },
    ]);
    setInput('');
  };

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
          Chat with {booking.tour_operator?.title || 'Tour Operator'}
        </div>

        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.senderId === userId ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] text-sm ${
                  msg.senderId === userId
                    ? 'bg-blue-100 text-right'
                    : 'bg-gray-200 text-left'
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

export default UserChatBox;
