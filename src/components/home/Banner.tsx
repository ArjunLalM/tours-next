/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { SearchTourAction } from '@/store/Tours';
import { Tour } from '@/types/TourTypes';
import { useRouter } from 'next/navigation';

const Banner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const toursSearch: Tour[] = useSelector((state: RootState) => state.tour.searchResult || []);

  useEffect(() => {
    if (query.trim().length > 0) {
      dispatch(SearchTourAction(query));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, dispatch]);

  const handleNavigate = (id: string) => {
    setShowDropdown(false);
    setQuery('');
    router.push(`/tours/view/${id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative w-full h-[400px] z-10">
      {/* Background Image */}
      <img
        src="https://images.squarespace-cdn.com/content/v1/5f9af6090c0a7348fa94da7e/1607123418336-86I3M7OTCSHXDHCOEH6N/IMG_6218-7.jpg"
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="relative max-w-md w-full px-4">
          <input
            type="search"
            id="default-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Tours..."
            required
          />

          {/* Dropdown */}
          {showDropdown && toursSearch.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg max-h-60 overflow-y-auto shadow-lg z-50">
              {toursSearch.map((tour) => (
                <li
                  key={tour._id}
                  onClick={() => handleNavigate(tour._id)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-black"
                >
                  {tour.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
};

export default Banner;
