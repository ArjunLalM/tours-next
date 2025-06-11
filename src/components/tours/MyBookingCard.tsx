/* eslint-disable @next/next/no-img-element */
import { Booking } from '@/types/BookingTypes';
import React, { useState } from 'react';
import UserChatBox from './UserChatBox';

type BookingUserProps = {
  booking: Booking;
};

const MyBookingCard = ({ booking }: BookingUserProps) => {
  const [showChat, setShowChat] = useState(false);
  const handleOpenChat = () => setShowChat(true);
  const handleCloseChat = () => setShowChat(false);



  return (
    <div className=" max-w-xs min-h-[420px] bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between relative">
      {/* Title and status */}
      {booking.status}
      <div>
        <div className="flex justify-between items-start">
          <h5 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {booking.tour_and_activity?.title}
          </h5>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              booking.status === 'pending'
                ? 'bg-yellow-500 text-white'
                : booking.status === 'accepted'
                ? 'bg-green-600 text-white'
                : booking.status === 'rejected'
                ? 'bg-red-600 text-white'
                : 'bg-gray-400 text-white'
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500 mt-1">
          {booking.updatedAt
            ? new Date(booking.updatedAt).toDateString()
            : 'No date available'}
        </p>

        {/* Image */}
        <div className="mt-3">
          <img
            className="w-full h-40 object-cover rounded"
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${booking.tour_and_activity?.images[0]}`}
            alt={booking.tour_and_activity.title}
          />
        </div>

        {/* Special Requirements or Title */}
        <p className="text-center text-gray-700 mt-3 text-sm line-clamp-2">
          {booking.special_requirements || 'No special requirements'}
        </p>
      </div>

      {/* Cost */}
      <p className="text-center text-green-700 text-lg font-bold mt-3">
        Total ₹ {(booking.total_cost || 0).toLocaleString()} /-
      </p>

      {/* View Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleOpenChat}
          className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-700 hover:text-white"
        >
          Chat
        </button>
      </div>

      {/* Chat Modal */}
     {showChat && (
  <UserChatBox onClose={handleCloseChat} booking={booking} userId={booking.user} />
)}
    </div>
  );
};

export default MyBookingCard;
