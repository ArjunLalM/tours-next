/* eslint-disable @next/next/no-img-element */
"use client";
import TourBooking from '@/components/tours/TourBooking';
import TourDetails from '@/components/tours/TourDetails';
import ToursReviewForm from '@/components/tours/ToursReviewForm';
import TourTabs from '@/components/tours/TourTabs';

import React, { useState } from 'react';

const ViewTour = () => {
  const images = [
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2762&q=80",
    "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80"
  ];

  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
   const [showForm, setShowForm] = useState(false);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
     const handleAddReviewClick = ()=>{
      setShowForm(true)
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 h-[90vh]">
      {/* Left Side – Image Viewer */}
      
      <div className="overflow-y-auto pr-2">
        <div className="p-2 md:p-4">
          <img
            className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[450px]"
            src={selectedImage}
            alt="Selected"
          />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 md:gap-4 px-2">
          {images.map((image, index) => (
            <div key={index} className="p-1">
              <img
                src={image}
                className="object-cover object-center h-20 w-full rounded-lg cursor-pointer"
                alt={`gallery-image-${index}`}
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>
       <div className="max-w-3xl mx-auto p-6">
  {/* Header */}
  <div className="mb-6">
    <h2 className="text-2xl font-semibold flex items-center gap-2">
      Reviews <span className="text-yellow-400">★★★★★</span>
      <span className="text-gray-600 text-sm">(4.6)</span>
      <a href="#" className="text-blue-600 underline text-sm ml-2">645 Reviews</a>
    </h2>
  </div>

  {/* Rating Summary */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
    <div className="flex items-center gap-4">
      <div className="text-4xl font-bold">4.65</div>
      <div className="text-gray-500 text-sm">out of 5</div>
    </div>

    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAddReviewClick}>Write a review</button>
     {showForm && (
        <div className="mt-4">
          <ToursReviewForm handleClose={() => setShowForm(false)} />
        </div>
      )}
  </div>

  {/* Ratings Breakdown */}
  <div className="space-y-2 mb-8">
    {[5, 4, 3, 2, 1].map((star, i) => (
      <div key={i} className="flex items-center gap-2 text-sm">
        <span className="w-6 text-yellow-400">★</span>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full"
            style={{ width: [40, 70, 10, 5, 2][i] + '%' }}
          ></div>
        </div>
        <a href="#" className="text-blue-600 min-w-fit ml-2">
          {[239, 432, 53, 32, 13][i]} reviews
        </a>
      </div>
    ))}
  </div>

  {/* Single Review */}
  <div className="border-t pt-4">
    <div className="flex items-center justify-between mb-1">
      <h4 className="font-semibold">Micheal Gough</h4>
      <span className="text-yellow-400">★★★★★</span>
    </div>
    <p className="text-gray-600 text-sm">
      My old IMAC was from 2013. This replacement was well needed. Very fast, and the colour matches my office set up perfectly. The display is out of this world and I’m very happy with this purchase.
    </p>
  </div>
</div>

       
      </div>


      {/* Right Side – Placeholder for Other Data */}
      
      <div className="p-2 md:p-4 overflow-y-auto pl-2">
   
      <div className="p-2 md:p-4 flex flex-col md:flex-row gap-4 justify-end">
 {/* Booking */}
 <TourBooking/>
  {/* Tour Details */}
  <TourDetails/>
</div>

<TourTabs/>

  <div className="mt-6" id="overview">
    <div  className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Overview</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Accommodation: 4-star hotels with complimentary breakfast.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Transport: Air-conditioned vehicles with Wi-Fi.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Tour Guide: English-speaking professional guide.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        • Meals: Breakfast included daily, some lunches and dinners provided.
      </p>
    </div>
  </div>

<div className="mt-6" id="itinerary">
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Day Wise Itinerary</h2>

    {/* Day 1 */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 1: Arrival & City Tour</h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Arrival at destination and hotel check-in</li>
        <li>Welcome drink and brief orientation</li>
        <li>Half-day city tour covering major landmarks</li>
        <li>Overnight stay at hotel</li>
      </ul>
    </div>

    {/* Day 2 */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 2: Historical Monuments & Local Cuisine</h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Visit to heritage sites and museums</li>
        <li>Lunch at a traditional local restaurant</li>
        <li>Evening cultural show</li>
        <li>Overnight stay at hotel</li>
      </ul>
    </div>

    {/* Day 3 */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 3: Nature Exploration</h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Breakfast and transfer to scenic countryside</li>
        <li>Guided nature walk and photography session</li>
        <li>Picnic lunch in a natural setting</li>
        <li>Return to hotel for rest</li>
      </ul>
    </div>

    {/* Day 4 */}
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 4: Free Day for Leisure or Shopping</h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Optional spa or wellness activities</li>
        <li>Local market visit for souvenirs</li>
        <li>Explore the area at your own pace</li>
        <li>Farewell dinner in the evening</li>
      </ul>
    </div>

    {/* Day 5 */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 5: Departure</h3>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Breakfast at the hotel</li>
        <li>Check-out and transfer to airport/station</li>
        <li>End of tour services</li>
      </ul>
    </div>
  </div>
</div>


    <div className="mt-6"  id="inclusions">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Inclusion/Exclusion</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Accommodation: 4-star hotels with complimentary breakfast.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Transport: Air-conditioned vehicles with Wi-Fi.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Tour Guide: English-speaking professional guide.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        • Meals: Breakfast included daily, some lunches and dinners provided.
      </p>
    </div>
  </div>

    <div className="mt-6" id="info">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Additional Info</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Accommodation: 4-star hotels with complimentary breakfast.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Transport: Air-conditioned vehicles with Wi-Fi.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Tour Guide: English-speaking professional guide.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        • Meals: Breakfast included daily, some lunches and dinners provided.
      </p>
    </div>
  </div>

      </div>
    </div>
  );
};

export default ViewTour;
