 
"use client";

import React, { useEffect, useState } from "react";
import MyBookingCard from "@/components/tours/MyBookingCard";
import OperatorBookingCard from "@/components/tours/OperatorBookingCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { ListOperatorBookingAction, ListUserBookingAction } from "@/store/Booking";
import { Booking } from "@/types/BookingTypes";

const MyBookings = () => {
  const [role, setRole] = useState<string | null>(null);
  const [operatorId, setOperatorId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const bookings: Booking[] = useSelector((state: RootState) => state.booking.data);

  // Get role and operatorId from localStorage once
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUserId = localStorage.getItem("userId");

    setRole(storedRole);
    if (storedRole === "operator" && storedUserId) {
      setOperatorId(storedUserId);
    }
  }, []);

  // Dispatch action when role and operatorId are ready
  useEffect(() => {
    if (role === "operator" && operatorId) {
      dispatch(ListOperatorBookingAction({ operatorId }));
    }
  }, [role, operatorId, dispatch]);

      const useAppSelector = useSelector.withTypes<RootState>()
    
    
      const store: Booking[]= useAppSelector(state => state.booking.data)
      const isLoading: boolean= useAppSelector(state => state.booking.isRefresh)
  console.log(store)
       useEffect(() => {
      dispatch(ListUserBookingAction())
    }, [dispatch,isLoading])

  if (!role) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center relative">
      {role === "user" ? (
        <>
         {store.map((bookings, index) => (
          <MyBookingCard  key={index} booking={bookings}/>
           ))}
        </>
      ) : role === "operator" ? (
        <>
          {bookings.map((booking, index) => (
            <OperatorBookingCard key={index} booking={booking} />
          ))}
        </>
      ) : (
        <p className="text-center col-span-full text-red-500">Invalid role</p>
      )}
    </div>
  );
};

export default MyBookings;
