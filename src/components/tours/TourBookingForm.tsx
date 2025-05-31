import React from 'react'
type TourBookingForm = {
  handleClose: () => void;
};

const TourBookingForm = ({handleClose}:TourBookingForm) => {
  return (
   <div className="relative">
  <div className="fixed inset-0 bg-white z-50 overflow-auto animate-slide-down p-8">
    <form className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">Tour Booking Form</h2>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact No</label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Enter contact number"
          />
        </div>
      </div>

      {/* Activity Details */}
      <div>
        <label className="block text-sm font-medium mb-1">Activity Details</label>
        <textarea
          className="w-full border border-gray-300 rounded px-4 py-2"
          rows="4"
          placeholder="Describe the activity you are booking for"
        />
      </div>

      {/* Pickup Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pickup Point</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Enter pickup location"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pickup Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
      </div>

      {/* Special Requirements */}
      <div>
        <label className="block text-sm font-medium mb-1">Special Requirements</label>
        <textarea
          className="w-full border border-gray-300 rounded px-4 py-2"
          rows="3"
          placeholder="Mention any special needs or preferences"
        />
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium mb-2">Payment Method</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="radio" name="paymentMethod" value="cash" className="accent-blue-600" />
            <span>Cash on Delivery</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="paymentMethod" value="upi" className="accent-blue-600" />
            <span>UPI</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="paymentMethod" value="stripe" className="accent-blue-600" />
            <span>Stripe</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        //   onClick={handleSubmit}
        >
          Book Now
        </button>
        <button
          type="button"
          className="text-red-600 font-medium"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>

  {/* Slide-down animation */}
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

  )
}

export default TourBookingForm