/* eslint-disable @next/next/no-img-element */
import React from 'react'

const MyBookingCard = () => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-4 mt-5">
  <div className="flex justify-between items-start">
    <h5 className="text-xl font-bold text-gray-900">Kozhikode beach</h5>
    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">cancelled</span>
  </div>
  <p className="text-sm text-gray-500 mt-1">May 19, 2025</p>
  
  <div className="mt-3">
    <img className="w-full h-40 object-cover rounded" src="/docs/images/blog/image-1.jpg" alt="daymaniyat islands trip" />
  </div>

  <p className="text-center text-gray-700 mt-3 text-sm"> islands snorkeling sharing trip to kozhikkode beach</p>

  <p className="text-center text-green-700 text-lg font-bold mt-4">Total ₹ 0.00 /-</p>

  <div className="flex justify-center mt-4">
    <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-700 hover:text-white">
    
      VIEW
    </a>
  </div>
</div>

  )
}

export default MyBookingCard