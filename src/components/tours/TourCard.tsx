/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react'
import EditToursForm from './EditToursForm';
import { Tour } from '@/types/TourTypes';
interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) =>{
  console.log(tour)
        const [showForm, setShowForm] = useState(false);
    const handleEditTourClick = ()=>{
        setShowForm(true)
    }
  
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
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
     {tour.description}
    </p>
    <a
      href="/tours/view"
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      view package
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


       <button
  
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-8"
      onClick={handleEditTourClick}
    >
      Edit Book
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

    </button>
 {showForm && (
        <div className="mt-4">
          <EditToursForm handleClose={() => setShowForm(false)}/>
        </div>
      )}
    
  </div>
</div>

  )
}

export default TourCard