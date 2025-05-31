import MyBookingCard from '@/components/tours/MyBookingCard'
import React from 'react'

const myBookings = () => {
  return (
       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
    <MyBookingCard/>
     <MyBookingCard/>
      <MyBookingCard/>
       <MyBookingCard/>
        <MyBookingCard/>
      </div>
  )
}

export default myBookings