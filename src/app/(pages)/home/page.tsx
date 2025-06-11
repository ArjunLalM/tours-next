
'use client'
import AboutBlog from '@/components/home/AboutBlog'
import Banner from '@/components/home/Banner'
import OfferTabs from '@/components/home/OfferTabs'
import OfferTourCarousel from '@/components/home/OfferTourCarousel'
import ReviewCarousel from '@/components/home/ReviewCarousel'
import TopTours from '@/components/home/TopTours'
import TourBlogs from '@/components/home/TourBlogs'
import { AppDispatch, RootState } from '@/store'
import { ListTopRatedTourAction, ListTourAction } from '@/store/Tours'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HomeTours} from '@/types/TourTypes';
import { Reviews } from '@/types/ReviewType'
import { ListAllReviewAction } from '@/store/Reviews'
import { Link } from '@mui/material'

const Page = () => {
     const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const useAppSelector = useSelector.withTypes<RootState>();
  const dispatch = useAppDispatch()
  const tours : HomeTours[] =useAppSelector((state) => state.tour.data)
  const isLoading = useAppSelector((state) => state.tour.isRefresh)
 const topTours : HomeTours[] =useAppSelector((state) => state.tour.data)
 const reviews : Reviews[] =useAppSelector((state) => state.review.data)

  useEffect(() => {
    dispatch(ListTourAction({}))
    dispatch(ListAllReviewAction({}))
    if (topTours){
    dispatch(ListTopRatedTourAction({}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,isLoading])

  return (
    <>
    <Banner/>
   <h1 className="text-5xl font-extrabold text-gray-800 text-center py-10 tracking-wide">
  Exclusive Offers
</h1>
<OfferTabs/>


   <OfferTourCarousel tours={Array.isArray(tours) ? tours : []} />

  
   <h1 className="text-4xl font-extrabold text-gray-800 text-center py-10 tracking-wide">
  Top Tours
</h1>
<TopTours topTours ={topTours}/>
<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">

</div>
<div className="flex justify-center">
 <Link href="/tours/list">
  <button className="px-4 py-3 bg-blue-500 text-white rounded-full mt-6">
    View All Tours
  </button>
</Link>
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

 <h1 className="text-3xl font-extrabold text-gray-800 text-center py-10 tracking-wide">
Tour Reviews
</h1>
{/* <div className="bg-gray-50"> */}
<ReviewCarousel reviews={Array.isArray(reviews) ? reviews : []} />
{/* </div> */}

<AboutBlog/>
<div className="sharethis-sticky-share-buttons"></div>
    </>
  )
}

export default Page