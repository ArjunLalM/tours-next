/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"

export interface TourState {
    [x: string]: any
    data : []  , // store all books data
    params: any,
    reviewData : any // store single book data
    loading : boolean,
    isRefresh: boolean
    error : string | null
    totalTours: number;
}

const initialState: TourState = {
    data: [],
    params: {},
    reviewData : {},
    loading: false,
    isRefresh: false,
    totalTours: 0,
    error: ""
}

interface Redux {
    getState : any,
    dispatch : Dispatch<any>
}

// add Review
export const AddReviewAction = createAsyncThunk(
    'reviews/addReview',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
               'Content-Type': 'application/json'
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/addReview`, data, headers)
     console.log(response.data)
    return response.data
   
  },
)

//List review 
export const ListReviewAction = createAsyncThunk(
    'reviews/listReview',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/getBookReviews`, data, headers)
    
    return response.data
  },
)
//ListAllReviewAction
export const ListAllReviewAction = createAsyncThunk(
    'reviews/listAllReview',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/all`, data, headers)
    
    return response.data
  },
)


//Edit Review
export const EditReviewAction = createAsyncThunk(
    'reviews/updateTour',
    async ( data: any , { }: Redux) => {
      const storedToken = localStorage.getItem('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
      };
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/updateReview`, data, headers);
      return response.data;
    }
  );



export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
 // Reducers for add tour
    .addCase(AddReviewAction.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(AddReviewAction.pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(AddReviewAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })
    //reducer for update tour
        .addCase(EditReviewAction.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(EditReviewAction.pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(EditReviewAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })
    // Reducers for List tour
    .addCase(ListReviewAction.fulfilled,  (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
       state.data = action.payload.data
      
    })
    .addCase(ListReviewAction.pending, (state) => {
        state.loading = true
       
    })
    .addCase(ListReviewAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
    })

      // Reducers for List tour
    .addCase(ListAllReviewAction.fulfilled,  (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
       state.data = action.payload.data
      
    })
    .addCase(ListAllReviewAction.pending, (state) => {
        state.loading = true
       
    })
    .addCase(ListAllReviewAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
    })

  },
})


export default reviewSlice.reducer;