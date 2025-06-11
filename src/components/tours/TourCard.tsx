/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import EditToursForm from "./EditToursForm";
import { Tour } from "@/types/TourTypes";


interface TourCardProps {
  tour: Tour;
  tourId: string;
}

const TourCard: React.FC<TourCardProps> = ({ tour, tourId }) => {
  console.log(tourId)
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const isOwner = userId === tour.tour_operator;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="w-full h-64 object-cover rounded-t-lg"
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${tour.images[0]}`}
          alt={tour.title}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {tour.title}
          </h5>
        </a>
        <div
  className="mb-3 font-normal text-gray-700 dark:text-gray-400"
  dangerouslySetInnerHTML={{ __html: tour.description }}
/>


     <div className="mt-4">
  {/* View Package - full width */}
  <a
    href={`/tours/view/${tourId}`}
    className="block w-full text-center px-3 py-2 mb-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    View Package
    <svg
      className="inline w-3.5 h-3.5 ms-2"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  </a>

  {isOwner && (
    <div className="flex gap-2">
      <button
        onClick={() => setShowForm(true)}
        className="w-1/2 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-300"
      >
        Edit Tour
        <svg
          className="inline w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>

      <button
        // onClick={() => handleDeleteTour(tour._id)}
        className="w-1/2 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-300"
      >
        Delete Tour
        <svg
          className="inline w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  )}
</div>

        {showForm && (
          <div className="mt-4">
            <EditToursForm
              handleClose={() => setShowForm(false)}
              onSave={() => setShowForm(false)}
              tour={tour}
              tourId={tourId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TourCard;
