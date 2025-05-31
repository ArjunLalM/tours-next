"use client"
import React, { useState } from 'react'

import TourEnquiryForm from './TourEnquiryForm';




const TourBooking = () => {
    const [showForm, setShowForm] = useState(false);
const handleBookNowClick = ()=>{
    setShowForm(true)
}
  return (
      <div className="flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 flex flex-col justify-between">
    <div>
      <p className="text-sm text-gray-500 line-through">₹31,999</p>
      <p className="text-2xl font-bold text-gray-900">
        ₹27,599 <span className="text-base font-medium">Per Person</span>
      </p>
      <p className="text-sm text-green-600 mt-1">
        💳 No Cost EMI Starts from ₹5,356 
        <a href="#" className="text-blue-600 underline ml-1">see option</a>
      </p>
    </div>
    <div className="mt-4">
      <button className="w-full mt-2 border border-blue-500 text-blue-600 font-semibold py-2 rounded-full hover:bg-blue-50 transition duration-200" onClick={handleBookNowClick}>
        ENQUIRE NOW
      </button>
    </div>
     {showForm && (
        <div className="mt-4">
          <TourEnquiryForm handleClose={() => setShowForm(false)}/>
        </div>
      )}
  </div>

  )
}

export default TourBooking