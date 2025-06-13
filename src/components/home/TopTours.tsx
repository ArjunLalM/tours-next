/* eslint-disable @next/next/no-img-element */
import { HomeTours } from '@/types/TourTypes';
import React from 'react';

interface TopTourProps {
  topTours: HomeTours[]; // an array
}

const TopTours = ({ topTours }: TopTourProps) => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
      {topTours.map((tour) => (
        <div
          key={tour._id}
          className="w-72 h-[450px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col"
        >
          {tour.images?.[0] && (
            <img
              className="w-full h-40 object-cover rounded-t-lg"
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${tour.images[0]}`}
              alt={tour.title}
            />
          )}
          <div className="p-5 flex flex-col justify-between flex-grow">
            <div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
                {tour.title}
              </h5>
              <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
                Duration: {tour.duration} days
              </p>
              <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
                Destination: {tour.destination}
              </p>
              <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
                ₹ {tour.price}
              </p>
            </div>

            <a
              href={`/tours/view/${tour._id}`}
              className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Book Now
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopTours;
