import AboutBlog from '@/components/home/AboutBlog'
import Banner from '@/components/home/Banner'
import OfferTabs from '@/components/home/OfferTabs'
import OfferTourCarousel from '@/components/home/OfferTourCarousel'
import ReviewCarousel from '@/components/home/ReviewCarousel'
import TopTours from '@/components/home/TopTours'
import TourBlogs from '@/components/home/TourBlogs'

import React from 'react'

const page = () => {
  return (
    <>
    <Banner/>
   <h1 className="text-5xl font-extrabold text-gray-800 text-center py-10 tracking-wide">
  Exclusive Offers
</h1>
<OfferTabs/>
<OfferTourCarousel/>

<div className="flex justify-center">
  <button className="px-4 py-3 bg-blue-500 text-white rounded-full">
    View All Offers
  </button>
</div>

   <h1 className="text-4xl font-extrabold text-gray-800 text-center py-10 tracking-wide">
  Top Tours
</h1>
<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
<TopTours/>
<TopTours/>
<TopTours/>
<TopTours/>
<TopTours/>
<TopTours/>
<TopTours/>
<TopTours/>
</div>
<div className="flex justify-center">
  <button className="px-4 py-3 bg-blue-500 text-white rounded-full mt-6">
    View All Tours
  </button>
</div>

 <h1 className="text-3xl font-extrabold text-gray-800 text-center py-10 tracking-wide">
 Enjoy Fresh Travel Blogs
</h1>
<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 justify-items-center">
    <TourBlogs/>
     <TourBlogs/>
     <TourBlogs/>
     <TourBlogs/>
</div>
<div className="flex justify-center">
  <button className="px-4 py-3 bg-blue-500 text-white rounded-full mt-6">
    View All Blogs
  </button>
</div>
 <h1 className="text-3xl font-extrabold text-gray-800 text-center py-10 tracking-wide">
Tour Reviews
</h1>
{/* <div className="bg-gray-50"> */}
  <ReviewCarousel />
{/* </div> */}

<AboutBlog/>

    </>
  )
}

export default page