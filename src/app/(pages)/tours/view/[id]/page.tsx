/* eslint-disable @next/next/no-img-element */
"use client";
import TourBooking from '@/components/tours/TourBooking';
import TourDetails from '@/components/tours/TourDetails';
import ToursReviewForm from '@/components/tours/ToursReviewForm';
import TourTabs from '@/components/tours/TourTabs';
import { AppDispatch, RootState } from '@/store';
import { viewTourAction } from '@/store/Tours';
import { Reviews } from '@/types/ReviewType';
import { Tour } from '@/types/TourTypes';
import { useParams } from 'next/navigation';
import { ListReviewAction } from '@/store/Reviews';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItineraryList from '@/components/tours/Itinerary';

const ViewTour = () => {
  const [existingReview, setExistingReview] = React.useState<Reviews | null>(null);
  const [isExistingReview, setIsExistingReview] = React.useState(false);
    const [role, setRole] = useState<string | null>(null);
   const [showForm, setShowForm] = useState(false);
    const {id} = useParams();

    const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const useAppSelector = useSelector.withTypes<RootState>()

  const dispatch = useAppDispatch();

  const store: Tour= useAppSelector(state => state.tour.tourData)
 const isLoading: boolean = useAppSelector(state => state.tour.isRefresh);
  const storeReview: Reviews[] = useAppSelector(state => state.review.data)
    const storeReviewLoading: boolean = useAppSelector(state => state.review.isRefresh)

     const handleAddReviewClick = ()=>{
      setShowForm(true)
  }
 useEffect(()=>{
    dispatch(viewTourAction({tourId:id}))
     dispatch(ListReviewAction({tourId:id}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch, storeReviewLoading])

const [selectedImage, setSelectedImage] = useState<string>(
  "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"
);

useEffect(() => {
  if (store.images && store.images.length > 0) {
    setSelectedImage(`${process.env.NEXT_PUBLIC_SERVER_URL}/${store.images[0]}`);
  }
}, [store.images]);

  // console.log(id,"BookId Passing ")
  const handleImageClick = (image: string) => {
    setSelectedImage(`${process.env.NEXT_PUBLIC_SERVER_URL}/${image}`);
  };


    useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (storeReview) {
      const foundReview = storeReview.find(review => review.user._id === userId);
      console.log(foundReview,"testing...")
      if (foundReview) {
        setExistingReview(foundReview);
        setIsExistingReview(true);
      } else {
        setExistingReview(null);
        setIsExistingReview(false);
      }
    }

  }, [storeReview]);

   useEffect(() => {
  const  storedRole= localStorage.getItem("role");
  setRole(storedRole);
}, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 h-[90vh]">
      {/* Left Side – Image Viewer */}
      
      <div className="overflow-y-auto pr-2">
        <div className="p-2 md:p-4">
          <img
            className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[450px]"
            src={selectedImage}
            alt="Selected"
          />
        </div>

           <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 md:gap-4 px-2">
        {store.images && store.images.length > 0 &&
  store.images.map((image, index) => (
    <div key={index} className="p-1">
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${image}`}
        className="object-cover object-center h-20 w-full rounded-lg cursor-pointer"
        alt={`gallery-image-${index}`}
        onClick={() => handleImageClick(image)}
      />
    </div>
  ))
}

        </div>
       <div className="max-w-3xl mx-auto p-6">
  {/* Header */}
  <div className="mb-6">
    <h2 className="text-2xl font-semibold flex items-center gap-2">
      Reviews <span className="text-yellow-400">★★★★★</span>
      <span className="text-gray-600 text-sm">(4.6)</span>
      <a href="#" className="text-blue-600 underline text-sm ml-2">645 Reviews</a>
    </h2>
  </div>

  {/* Rating Summary */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
    <div className="flex items-center gap-4">
      <div className="text-4xl font-bold">4.65</div>
      <div className="text-gray-500 text-sm">out of 5</div>
    </div>
    {role === "user" && (
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleAddReviewClick}>{isExistingReview ? "Edit Review" : "Add Review"}</button>
    )}
     {showForm && (
        <div className="mt-4">
          <ToursReviewForm 
  handleClose={() => setShowForm(false)} 
  open={showForm} 
  tourId={store._id} 

  isExistingReview={isExistingReview} 
  existingReview={existingReview}
/>

        </div>
      )}
  </div>

  {/* Ratings Breakdown */}
  <div className="space-y-2 mb-8">
    {[5, 4, 3, 2, 1].map((star, i) => (
      <div key={i} className="flex items-center gap-2 text-sm">
        <span className="w-6 text-yellow-400">★</span>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full"
            style={{ width: [40, 70, 10, 5, 2][i] + '%' }}
          ></div>
        </div>
        <a href="#" className="text-blue-600 min-w-fit ml-2">
          {[239, 432, 53, 32, 13][i]} reviews
        </a>
      </div>
    ))}
  </div>

  {/* Single Review */}
  <div className="border-t pt-4">
    <div className="flex items-center justify-between mb-1">
      <h4 className="font-semibold">Micheal Gough</h4>
      <span className="text-yellow-400">★★★★★</span>
    </div>
    <p className="text-gray-600 text-sm">
      My old IMAC was from 2013. This replacement was well needed. Very fast, and the colour matches my office set up perfectly. The display is out of this world and I’m very happy with this purchase.
    </p>
  </div>
  <div className="space-y-4 mt-6 max-w-3xl mx-auto">
  {storeReview.length === 0 && (
    <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
  )}
  
  {storeReview.map((review) => (
    <div key={review._id} className="border-t pt-4">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold">{review.user?.firstName || 'Anonymous'}</h4>
        <span className="text-yellow-400">
          {"★".repeat(review.ratings)}{" "}
          {"☆".repeat(5 - review.ratings)}
        </span>
      </div>
     <p className="text-gray-600 text-sm">
     {review.review}
    </p>
    </div>
  ))}
</div>
</div>

       
      </div>


      {/* Right Side – Placeholder for Other Data */}
      
      <div className="p-2 md:p-4 overflow-y-auto pl-2">
   
      <div className="p-2 md:p-4 flex flex-col md:flex-row gap-4 justify-end">
 {/* Booking */}
 <TourBooking tour={store} role ={role}/>
  {/* Tour Details */}
  <TourDetails tour={store}/>
</div>

<TourTabs/>

  <div className="mt-6" id="overview">
    <div  className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Description</h2>
     
      <div
  className="mb-3 font-normal text-gray-700 dark:text-gray-400"
  dangerouslySetInnerHTML={{ __html: store.description }}
/> 
    </div>
  </div>

<div className="mt-6" id="itinerary">
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Day Wise Itinerary
      </h2>
    </div>

   <ItineraryList itinerary={store?.itinerary || []} tourId={store._id}  operatorId={store.tour_operator} role={role} loading={isLoading} />


  </div>
</div>


    <div className="mt-6"  id="inclusions">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Inclusion/Exclusion</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Accommodation: 4-star hotels with complimentary breakfast.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Transport: Air-conditioned vehicles with Wi-Fi.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Tour Guide: English-speaking professional guide.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        • Meals: Breakfast included daily, some lunches and dinners provided.
      </p>
    </div>
  </div>

    <div className="mt-6" id="info">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Additional Info</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Accommodation: 4-star hotels with complimentary breakfast.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Transport: Air-conditioned vehicles with Wi-Fi.
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        • Tour Guide: English-speaking professional guide.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        • Meals: Breakfast included daily, some lunches and dinners provided.
      </p>
    </div>
  </div>

      </div>
    </div>
  );
};

export default ViewTour;
