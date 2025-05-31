/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Optional, for nicer icons. Or use any icons.

const offers = [
  {
    title: 'Get Foreign Currency',
    highlight: '& Forex Cards',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEXpw6r8533uL7XAi0wrvfTXPWP2Ee9VmVg&s',
    description: 'Get foreign currency & forex cards delivered from RBI-authorized money changers.',
    cta: 'Book Now',
    tag: null,
  },
   {
    title: 'Get Foreign Currency',
    highlight: '& Forex Cards',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEXpw6r8533uL7XAi0wrvfTXPWP2Ee9VmVg&s',
    description: 'Get foreign currency & forex cards delivered from RBI-authorized money changers.',
    cta: 'Book Now',
    tag: null,
  },
   {
    title: 'Get Foreign Currency',
    highlight: '& Forex Cards',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEXpw6r8533uL7XAi0wrvfTXPWP2Ee9VmVg&s',
    description: 'Get foreign currency & forex cards delivered from RBI-authorized money changers.',
    cta: 'Book Now',
    tag: null,
  },
   {
    title: 'Get Foreign Currency',
    highlight: '& Forex Cards',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEXpw6r8533uL7XAi0wrvfTXPWP2Ee9VmVg&s',
    description: 'Get foreign currency & forex cards delivered from RBI-authorized money changers.',
    cta: 'Book Now',
    tag: null,
  },
   {
    title: 'Get Foreign Currency',
    highlight: '& Forex Cards',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEXpw6r8533uL7XAi0wrvfTXPWP2Ee9VmVg&s',
    description: 'Get foreign currency & forex cards delivered from RBI-authorized money changers.',
    cta: 'Book Now',
    tag: null,
  },
  
  {
    title: 'Exclusive Fares on',
    highlight: 'Malaysia Airlines',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEXpw6r8533uL7XAi0wrvfTXPWP2Ee9VmVg&s',
    description: 'Fly from Trivandrum with fares from INR 14,799',
    cta: 'Book Now',
    tag: null,
  },
  {
    title: 'Best Deal on',
    highlight: 'Group Departure Packages',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEXpw6r8533uL7XAi0wrvfTXPWP2Ee9VmVg&s',
    description: 'Create magical moments with group tour packages',
    cta: 'Book Now',
    tag: 'EXCLUSIVE',
  },
  {
    title: 'Exclusive Deal on',
    highlight: 'IndiGo Airlines',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEXpw6r8533uL7XAi0wrvfTXPWP2Ee9VmVg&s',
    description: 'Get up to 20% OFF on domestic flights with IndiGo',
    cta: 'Book Now',
    tag: null,
  },
];

const OfferTourCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 300;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="px-6 py-4 relative">
   
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


      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar pb-6"
      >
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-md p-4 relative"
          >
            {offer.tag && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                {offer.tag}
              </div>
            )}
           <div className="h-32 flex bg-gradient-to-br">
  <img 
    src={offer.image} 
    className="h-full w-full object-cover" 
  />
</div>
            <h3 className="text-sm font-semibold text-gray-600">{offer.title}</h3>
            <h2 className="text-lg font-bold text-gray-900">{offer.highlight}</h2>
            <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
            <button className="mt-3 text-blue-600 font-semibold hover:underline text-sm">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferTourCarousel;
