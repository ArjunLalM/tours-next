/* eslint-disable @next/next/no-img-element */
'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HomeTours } from '@/types/TourTypes';
import { Link } from '@mui/material';

interface OfferTourCarouselProps {
  tours: HomeTours[]; 

} 
const OfferTourCarousel = ({ tours  }: OfferTourCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  // Ensure tours is an array
  return (
    <div className="px-6 py-4 relative">
      {tours.length > 0 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hidden md:block"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hidden md:block"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar pb-6"
      >
        {tours &&tours.map((tour) => (
          <div
            key={tour._id}
            className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {tour.images?.[0] && (
              <img
                className="w-full h-40 object-cover"
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${tour.images[0]}`}
                alt={tour.title}
              />
            )}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-1">{tour.title}</h3>
              <p className="text-sm text-gray-500">{tour.duration} days</p>
              <h2 className="text-base font-bold text-gray-900">{tour.destination}</h2>
              <p className="text-sm text-gray-500 mt-1">₹ {tour.price}</p>
           
              <Link href={`/tours/view/${tour._id}`} className="mt-3">
              <button className="text-blue-600 font-semibold text-sm">
               Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferTourCarousel;
