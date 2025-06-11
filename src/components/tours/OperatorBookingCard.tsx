
'use client';
import { AppDispatch } from '@/store';
import { Booking } from '@/types/BookingTypes';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {EditBookingAction } from '@/store/Booking';
import { toast } from 'react-toastify';
import OperatorChatBox from './OperatorChatBox';

type BookingOperatorProps = {
  booking: Booking;
};

const OperatorBookingCard = ({ booking }: BookingOperatorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState(booking.status);
  const [showChat, setShowChat] = useState(false);
    const handleOpenChat = () => setShowChat(true);
    const handleCloseChat = () => setShowChat(false);
  const handleAction = async (action: 'accept' | 'reject') => {
    try {
      const result = await dispatch(EditBookingAction ({ bookingId: booking._id, action }));
      if (EditBookingAction .fulfilled.match(result)) {
        toast.success(`Booking ${action}ed successfully`);
        setStatus(result.payload.status);
      } else {
        toast.error(result.payload as string);
      }
    } catch {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-4 mt-5">
      <div className="flex justify-between items-start">
        <h5 className="text-xl font-bold text-gray-900">
          {booking.tour_operator?.title || 'No title'}
        </h5>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        {booking.createdAt ? new Date(booking.createdAt).toDateString() : 'No date available'}
      </p>

      <div className="text-sm text-gray-700 mt-3 space-y-1">
        <p><strong>Phone:</strong> {booking.phone_number}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Pickup Point:</strong> {booking.pickup_point}</p>
        <p><strong>Special Requirements:</strong> {booking.special_requirements}</p>
        <p><strong>Date:</strong> {booking.date ? new Date(booking.date).toDateString() : 'No booking date'}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Price:</strong> {booking.tour_operator?.price}</p>
        <p><strong>Payment:</strong> {booking.payment_mode}</p>
        <p><strong>Payment Status:</strong> {status}</p>
      </div>

      <p className="text-center text-green-700 text-lg font-bold mt-3">
        Total {booking.total_cost}/-
      </p>

      {status === 'pending' ? (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => handleAction('accept')}
            className="px-4 py-2 text-sm font-medium text-green-700 border border-green-700 rounded-lg hover:bg-green-700 hover:text-white"
          >
            ACCEPT
          </button>
          <button
            onClick={() => handleAction('reject')}
            className="px-4 py-2 text-sm font-medium text-red-700 border border-red-700 rounded-lg hover:bg-red-700 hover:text-white"
          >
            REJECT
          </button>
        </div>
        
      ) : (
        <p className="text-center font-semibold text-blue-700 mt-4">Tour {status}</p>
      )}

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
  <OperatorChatBox onClose={handleCloseChat} booking={booking} />
)}
    </div>
  );
};

export default OperatorBookingCard;
