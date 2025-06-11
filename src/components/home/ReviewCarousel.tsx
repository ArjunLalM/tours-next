'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Reviews } from '@/types/ReviewType';

interface OfferReviewCarouselProps {
  reviews:Reviews[]; 
}

const ReviewCarousel = ({reviews}:OfferReviewCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 350;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="px-6 py-10 relative">
    {/* // <div className="px-6 py-8 relative bg-gray-50"> */}

      {/* Scroll buttons */}
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

      {/* Review cards */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar pb-6"
      >
        {reviews&&reviews.map((item) => (
          <div
            key={item._id}
            className="min-w-[360px] max-w-sm bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
          >
            {/* Username */}
            <h3 className="text-md font-bold text-gray-800 mb-1">{item.user?.firstName}</h3>
             <p className="text-md font-semi-bold text-gray-700 mb-1">{item.tour?.title}</p>
            {/* Rating */}
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 mr-1 ${
                    i < item.ratings ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Review */}
            <p className="text-sm text-gray-600">{item.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;
