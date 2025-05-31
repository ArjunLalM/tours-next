"use client"
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


       const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const useAppSelector = useSelector.withTypes<RootState>();

  const dispatch = useAppDispatch();
  const store: Tour[] = useAppSelector(state => state.tour.data);
  // const isLoading: boolean = useAppSelector(state => state.book.isRefresh);
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    dispatch(ListTourAction({}));
  }, [dispatch]);
  const handleAddTourClick = ()=>{
      setShowForm(true)
  }

  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-6 h-[100vh]">
      {/* Left section (1/4 width) */}
      <div className="col-span-1  rounded-xl shadow-md overflow-y-auto h-full p-4">
 


        <div className="space-y-2 mb-6">
          <h4 className="font-medium">Categories</h4>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Beach
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Adventure
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Family
          </label>
        </div>

       
        <div className="mb-8">
          <h4 className="text-base font-semibold text-gray-700 mb-3">Price Range (INR)</h4>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

    
        <div className="mb-6">
          <h4 className="text-base font-semibold text-gray-700 mb-3">Location</h4>
          <input
            type="text"
            placeholder="From (e.g. Calicut)"
            className="w-full mb-3 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="To (e.g. Munnar)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" >
          Apply Filters
        </button>
      </div>
 
      {/* Right section (3/4 width) */}

      <div className="col-span-3 overflow-y-auto h-full pl-2">
      {role === 'operator' && (
  <button
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-3"
    onClick={handleAddTourClick}
  >
    Add New Book
  </button>
)}

 {showForm && (
        <div className="mt-4">
          <AddToursForm handleClose={() => setShowForm(false)} onSave={() => setShowForm(false)} />
        </div>
      )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {store.map((item: Tour, index: number) =>  (
            <TourCard key={index} tour={item}/>
          ))}
 
        </div>
      </div>
    </div>
  );
};

export default ToursList;
