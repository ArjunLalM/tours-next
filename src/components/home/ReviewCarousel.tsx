'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    user: 'Arjunlal',
    rating: 5,
    review: 'Amazing service and fast booking experience. Highly recommend!',
  },
  {
    user: 'Nithin Raj',
    rating: 4,
    review: 'Smooth process and great offers available on forex cards.',
  },
  {
    user: 'Divya',
    rating: 5,
    review: 'The support team was really helpful. Loved the experience.',
  },
  {
    user: 'Ramesh',
    rating: 3,
    review: 'It was okay, but could be improved with more package options.',
  },
  {
    user: 'Sneha S',
    rating: 5,
    review: 'Best travel platform I’ve used so far. Will use again!',
  },
  {
    user: 'Anil ',
    rating: 4,
    review: 'Quick and reliable. The group package was wonderful.',
  },
  {
    user: 'Lakshmi',
    rating: 5,
    review: 'Excellent service. Everything was smooth and efficient.',
  },
];

const ReviewCarousel = () => {
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
        {reviews.map((item, idx) => (
          <div
            key={idx}
            className="min-w-[360px] max-w-sm bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
          >
            {/* Username */}
            <h3 className="text-md font-bold text-gray-800 mb-1">{item.user}</h3>

            {/* Rating */}
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 mr-1 ${
                    i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
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
