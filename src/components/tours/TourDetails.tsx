import React from 'react'
import { AccessTime, LocationOn, Hotel, DirectionsCar, Restaurant, Visibility } from '@mui/icons-material';
import { Divider } from '@mui/material';
const TourDetails = () => {
  return (
      <div className="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 flex flex-col justify-between">
    <div>
      {/* Duration */}
      <div className="flex items-center mb-2">
        <AccessTime className="text-pink-500 mr-2" />
        <span className="font-medium">Duration :</span>
        <span className="ml-1">5 Nights & 6 Days</span>
      </div>

      {/* Places to Visit */}
      <div className="flex items-center mb-4">
        <LocationOn className="text-red-500 mr-2" />
        <span className="font-medium">Places to Visit :</span>
        <span className="ml-1">3N Port Blair | 2N Havelok Island</span>
      </div>

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
  )
}

export default TourDetails