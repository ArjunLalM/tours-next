'use client'
import { configureStore } from '@reduxjs/toolkit'
import  { tourSlice } from '../store/Tours'
import { reviewSlice } from './Reviews'
import { bookingSlice } from './Booking'
import { itinerarySlice } from './Itinerary'
export const store = configureStore({
  reducer: {
    tour: tourSlice.reducer,
    review: reviewSlice.reducer,
    booking: bookingSlice.reducer,
    itinerary:itinerarySlice.reducer

  },
})

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch