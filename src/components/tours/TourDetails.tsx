import React from 'react';
import {
  AccessTime,
  LocationOn,
  Hotel,
  DirectionsCar,
  Restaurant,
  Visibility,
} from '@mui/icons-material';
import { Divider } from '@mui/material';
import { Tour } from '@/types/TourTypes';

type TourDetailsProps = {
  tour: Tour;
};

const TourDetails: React.FC<TourDetailsProps> = ({ tour }) => {
  return (
    <div className="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 flex flex-col justify-between">
      <div>
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{tour.title}</h2>

        {/* Description */}
               <div
  className="mb-3 font-normal text-gray-700 dark:text-gray-400"
  dangerouslySetInnerHTML={{ __html: tour.description }}
/>

        {/* Duration */}
        <div className="flex items-center mb-2">
          <AccessTime className="text-pink-500 mr-2" />
          <span className="font-medium">Duration:</span>
          <span className="ml-1">{tour.duration} Days</span>
        </div>

        {/* Destination + Coordinates + Map */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-4 text-sm">
          <div className="flex items-center">
            <LocationOn className="text-red-500 mr-2" />
            <span className="font-medium">Places to Visit:</span>
            <span className="ml-1">{tour.destination}</span>
          </div>
          {tour.coordinates?.coordinates?.length === 2 && (
            <div className="flex items-center mt-1 sm:mt-0 sm:ml-4 space-x-2 text-gray-600">
              <span>
                (Lat: {tour.coordinates.coordinates[1]}, Lng: {tour.coordinates.coordinates[0]})
              </span>
              <a
                href={`https://www.google.com/maps?q=${tour.coordinates.coordinates[1]},${tour.coordinates.coordinates[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                View on Map
              </a>
            </div>
          )}
        </div>

        {/* Activity Types */}
        {tour.activityTypes && (
          <div className="mb-4">
            <span className="font-medium">Activities:</span>{' '}
            <span className="text-sm text-gray-700">{tour.activityTypes}</span>
          </div>
        )}

        {/* Divider with label */}
        <div className="relative my-4">
          <Divider />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-sm font-medium text-gray-600">
            Package Includes
          </span>
        </div>

        {/* Icons row */}
        <div className="grid grid-cols-4 text-center gap-2 text-sm text-gray-700">
          <div className="flex flex-col items-center">
            <Hotel className="mb-1" />
            Hotel
          </div>
          <div className="flex flex-col items-center">
            <Visibility className="mb-1" />
            Sightseeing
          </div>
          <div className="flex flex-col items-center">
            <DirectionsCar className="mb-1" />
            Transfer
          </div>
          <div className="flex flex-col items-center">
            <Restaurant className="mb-1" />
            Meal
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
