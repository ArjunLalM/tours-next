
"use client";
import AddToursForm from '@/components/tours/AddToursForm';
import TourCard from '@/components/tours/TourCard';
import { AppDispatch, RootState } from '@/store';
import { ListTourAction } from '@/store/Tours';
import { Tour } from '@/types/TourTypes';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ToursList = () => {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const useAppSelector = useSelector.withTypes<RootState>();
  const dispatch = useAppDispatch();

  const store: Tour[] = useAppSelector(state => state.tour.data);
 const isLoading: boolean = useAppSelector(state => state.tour.isRefresh);
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    dispatch(ListTourAction({})); // Load all tours initially
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleCheckboxChange = (value: string) => {
    setCategories(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleFilter = () => {
    dispatch(ListTourAction({
      minPrice,
      maxPrice,
      destination,
      categories
    }));
  };

  const handleAddTourClick = () => setShowForm(true);

  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-6 h-[100vh]">
      {/* Left filters */}
      <div className="col-span-1 rounded-xl shadow-md overflow-y-auto h-full p-4">
        <div className="space-y-2 mb-6">
          <h4 className="font-medium">Categories</h4>
          {["Beach", "Nature", "Family"].map(category => (
            <label key={category} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={categories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              {category}
            </label>
          ))}
        </div>

        <div className="mb-8">
          <h4 className="text-base font-semibold text-gray-700 mb-3">Price Range (INR)</h4>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-base font-semibold text-gray-700 mb-3">Destination</h4>
          <input
            type="text"
            placeholder="From (e.g. Calicut)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleFilter}
        >
          Apply Filters
        </button>
      </div>

      {/* Right results */}
      <div className="col-span-3 overflow-y-auto h-full pl-2">
        {role === 'operator' && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-3"
            onClick={handleAddTourClick}
          >
            Add New Tour
          </button>
        )}

        {showForm && (
          <div className="mt-4">
            <AddToursForm handleClose={() => setShowForm(false)} onSave={() => setShowForm(false)} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(store) &&store.map((item: Tour, index: number) => (
            <TourCard key={index} tour={item} tourId={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToursList;



