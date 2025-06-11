'use client';
import { ItineraryItem } from '@/types/TourTypes';
import React, { useState } from 'react';



type ItineraryEditorProps = {
  initialItinerary: ItineraryItem[];
};

const ItineraryEditor = ({ initialItinerary }: ItineraryEditorProps) => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(initialItinerary || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

 const handleAdd = () => {
  const newStep = itinerary.length + 1;
  const newItem: ItineraryItem = {
    _id: Math.random().toString(36).substr(2, 9), // dummy ID
    step: newStep,
    description: `Day ${newStep} plan`,
    day: `Day ${newStep}`,
  };

  setItinerary([...itinerary, newItem]);
};

  const handleDelete = (index: number) => {
    const updated = itinerary.filter((_, i) => i !== index).map((item, i) => ({
      ...item,
      step: i + 1,
    }));
    setItinerary(updated);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditValue(itinerary[index].description);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = () => {
    if (editingIndex === null) return;
    const updated = [...itinerary];
    updated[editingIndex].description = editValue;
    setItinerary(updated);
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <div className="mt-6" id="itinerary">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Day Wise Itinerary</h2>
          <button
            onClick={handleAdd}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Day
          </button>
        </div>

        <div className="mt-4">
          {itinerary.map((item, index) => (
            <div key={item._id || index} className="mb-4 border-b pb-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day {item.step}</h3>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>

              {editingIndex === index ? (
                <div className="flex flex-col mt-2">
                  <input
                    value={editValue}
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                  />
                  <button
                    onClick={handleEditSave}
                    className="mt-2 px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <ul
                  className="list-disc list-inside text-gray-700 dark:text-gray-300 cursor-pointer"
                  onClick={() => handleEditClick(index)}
                >
                  <li>{item.description}</li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryEditor;
