"use client";
import React, { useState } from "react";

type TourAddingForm = {
  handleClose: () => void;
};

const EditToursForm = ({ handleClose }: TourAddingForm) => {
  const [itinerary, setItinerary] = useState([""]);
  //  const [value, setValue] = useState('');
  const handleItineraryChange = (index: number, value: string) => {
    const updated = [...itinerary];
    updated[index] = value;
    setItinerary(updated);
  };

  const addItineraryField = () => {
    setItinerary([...itinerary, ""]);
  };

  const removeItineraryField = (index: number) => {
    if (itinerary.length === 1) return; // prevent removing the last day
    const updated = itinerary.filter((_, i) => i !== index);
    setItinerary(updated);
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-white z-50 overflow-auto animate-slide-down p-8">
        <form className="space-y-6 max-w-3xl mx-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Enter tour title"
            />
          </div>

          {/* Description (Rich Text placeholder) */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows={6}
              placeholder="Enter detailed description"
            />
          </div>

          {/* Destination & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Destination</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter destination"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Duration (Days)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter duration"
              />
            </div>
          </div>

          {/* Price & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Availability (Persons)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Number of persons"
              />
            </div>
          </div>

          {/* Activity Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Activity Type</label>
            <select className="w-full border border-gray-300 rounded px-4 py-2">
              <option>Select activity type</option>
              <option>Adventure</option>
              <option>Nature</option>
              <option>Cultural</option>
             
            </select>
          </div>

          {/* Highlight Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload Highlight</label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded px-4 py-2"
              accept="image/*"
              multiple
            />
          </div>

          {/* Itinerary */}
          <div>
            <label className="block text-sm font-medium mb-2">Itinerary</label>
            {itinerary.map((item, index) => (
              <div key={index} className="relative mb-4">
                <textarea
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  rows={3}
                  placeholder={`Day ${index + 1} itinerary`}
                  value={item}
                  onChange={(e) => handleItineraryChange(index, e.target.value)}
                />
                {itinerary.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItineraryField(index)}
                    className="absolute top-1 right-1 text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addItineraryField}
              className="text-blue-600 mt-1 text-sm hover:underline"
            >
              + Add Day
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={handleClose}
            >
              Add
            </button>
            <button
              type="button"
              className="text-red-600 font-medium"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Slide-down animation */}
      <style jsx>{`
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default EditToursForm;
