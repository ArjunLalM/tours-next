'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { AddBookingAction, CreateStripeBookingAction } from '@/store/Booking';
import { toast } from 'react-toastify';
import { Tour } from '@/types/TourTypes';

type TourBookingFormProp = {
  handleClose: () => void;
  tourId: string;
  operatorId: string;
   bookingDate: string;
  numberOfPersons: number;
  tour:Tour
};

type FormValues = {
  tourId: string;
  operatorId: string;
  phone_number: string;
  email: string;
  pickup_point: string;
  special_requirements: string;
  date: string; 
  time: string;
  no_of_persons: number;
  total_cost: number;
  payment_mode: 'cash' | 'upi' | 'stripe';
};

const bookingSchema = yup.object({
  tourId: yup.string().required(),
  operatorId: yup.string().required(),
  phone_number: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits')
    .required('Contact number is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  pickup_point: yup.string().required('Pickup point is required'),
  special_requirements: yup.string().required('Pickup point is required'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
  no_of_persons: yup.number().min(1, 'At least 1 person').required('Number of persons is required'),
  total_cost: yup.number().min(0, 'Total cost must be positive').required('Total cost is required'),
  payment_mode: yup
    .mixed<'cash' | 'upi' | 'stripe'>()
    .oneOf(['cash', 'upi', 'stripe'], 'Invalid payment method')
    .required('Please select a payment method'),
});

const TourBookingForm = ({ handleClose, operatorId, tourId,  bookingDate, numberOfPersons,tour}: TourBookingFormProp) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      tourId,
      operatorId,
      phone_number: '',
      email: '',
      pickup_point: '',
      special_requirements: '',
      date: bookingDate || new Date().toISOString().split('T')[0],
      time: '',
      no_of_persons: numberOfPersons || 1,
      total_cost: tour.price * (numberOfPersons || 1),
      payment_mode: 'cash',
    },
  });
 

  const onSubmit = async (data: FormValues) => {
  try {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      toast.error('User not logged in.');
      return;
    }

    const payload = {
      user: userId,
      tourId: data.tourId,
      operatorId: data.operatorId,
      phone_number: data.phone_number,
      email: data.email,
      pickup_point: data.pickup_point,
      special_requirements: data.special_requirements || null,
      date: data.date,
      time: data.time,
      no_of_persons: data.no_of_persons,
      total_cost: data.total_cost,
      payment_mode: data.payment_mode,
    };

    if (data.payment_mode === 'stripe') {
      const result = await dispatch(CreateStripeBookingAction(payload));

      if (CreateStripeBookingAction.fulfilled.match(result)) {
        const { url } = result.payload;
        window.location.href = url; 
          toast.success('Booking successful!');
      } else {
        toast.error('Stripe payment failed.');
      }
    } else {
      const result = await dispatch(AddBookingAction(payload));

      if (AddBookingAction.fulfilled.match(result)) {
        toast.success('Booking successful!');
        handleClose();
      } else {
        toast.error('Failed to book tour.');
      }
    }
  } catch (error) {
    toast.error('Something went wrong. Please try again.');
    console.error(error);
  }
};


  return (
    <div className="relative">
      <div className="fixed inset-0 bg-white z-50 overflow-auto animate-slide-down p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4">Tour Booking Form</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                {...register('phone_number')}
                type="tel"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter contact number"
              />
              {errors.phone_number && <p className="text-red-600 text-sm">{errors.phone_number.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter email"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Pickup Point</label>
              <input
                {...register('pickup_point')}
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter pickup location"
              />
              {errors.pickup_point && <p className="text-red-600 text-sm">{errors.pickup_point.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                {...register('date')}
                type="date"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                {...register('time')}
                type="time"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {errors.time && <p className="text-red-600 text-sm">{errors.time.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Persons</label>
              <input
                {...register('no_of_persons')}
                type="number"
                min={1}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {errors.no_of_persons && <p className="text-red-600 text-sm">{errors.no_of_persons.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Cost</label>
              <input
                {...register('total_cost')}
                type="number"
                min={0}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {errors.total_cost && <p className="text-red-600 text-sm">{errors.total_cost.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Special Requirements</label>
            <textarea
              {...register('special_requirements')}
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows={3}
              placeholder="Mention any special needs or preferences"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <div className="space-y-2">
              {['cash', 'upi', 'stripe'].map((method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    {...register('payment_mode')}
                    type="radio"
                    name="payment_mode"
                    value={method}
                    className="accent-blue-600"
                  />
                  <span>{method.charAt(0).toUpperCase() + method.slice(1)}</span>
                </label>
              ))}
            </div>
            {errors.payment_mode && <p className="text-red-600 text-sm">{errors.payment_mode.message}</p>}
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Booking...' : 'Book Now'}
            </button>
            <button
              type="button"
              className="text-red-600 font-medium"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default TourBookingForm;
