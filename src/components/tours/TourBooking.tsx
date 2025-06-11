"use client";
import React, { useEffect, useState } from "react";
import TourEnquiryForm from "./TourEnquiryForm";
import { Tour } from "@/types/TourTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { TourAvailableAction } from "@/store/Tours";

type TourBookingProps = {
  tour: Tour;
  role: string | null;
};

const TourBooking: React.FC<TourBookingProps> = ({ tour, role }) => {
  const [showForm, setShowForm] = useState(false);
  const [bookedCount, setBookedCount] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
 useEffect(() => {
  const fetchAvailability = async () => {
    try {
      const res = await dispatch(TourAvailableAction({ tourId: tour._id })).unwrap();
      setBookedCount(res.bookedCount || 0);
    } catch (error) {
      console.error("Error fetching availability", error);
    }
  };

  fetchAvailability();
}, [dispatch, tour._id]);

  const handleBookNowClick = () => {
    setShowForm(true);
  };

  const remainingSpots = Math.max(tour.availability - bookedCount, 0);

  return (
    <div className="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
      {/* Price Section */}
      <div className="mb-6">
        <p className="text-sm text-green-600 mt-3">
          💳 <span className="font-medium">No Cost EMI</span> starts from ₹5,356
          <a href="#" className="text-blue-600 underline ml-1">
            See options
          </a>
        </p>

        <p className="text-3xl font-extrabold text-gray-900 mt-6">
          ₹{tour.price}
          <span className="block text-base font-medium mt-1 text-gray-600">
            Per Person
          </span>
        </p>
      </div>

      {/* Enquiry Button */}
      <div className="w-full">
        {role === "user" && (
          <button
            onClick={handleBookNowClick}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-full hover:bg-blue-700 transition duration-200 shadow"
          >
            ENQUIRE NOW
          </button>
        )}
        {/* Availability Info */}
        <p className="mt-4 text-sm text-red-600 font-semibold">
          ⏳ Hurry up! Only {remainingSpots} spots left.
        </p>
      </div>

      {/* Enquiry Form */}
      {showForm && (
        <div className="mt-6 w-full">
          <TourEnquiryForm
            handleClose={() => setShowForm(false)}
            open={showForm}
            bookingAvailability={tour.availability}
            tour={tour}
          />
        </div>
      )}
    </div>
  );
};

export default TourBooking;
