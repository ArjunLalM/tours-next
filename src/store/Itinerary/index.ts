/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"

export interface TourState {
    [x: string]: any
    data : []  , // store all books data
    params: any,
    itineraryData : any // store single book data
    loading : boolean,
    isRefresh: boolean
    error : string | null
    totalTours: number;
}

const initialState: TourState = {
    data: [],
    params: {},
   itineraryData : {},
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
export const addItinerary = createAsyncThunk(
    'tours/itinerary',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
               'Content-Type': 'application/json'
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/addNew`, data, headers)
     console.log(response.data)
    return response.data
   
  },
)



//Edit Review
export const updateItinerary = createAsyncThunk(
    'tours/itineraryUpdate',
    async ( data: any , { }: Redux) => {
      const storedToken = localStorage.getItem('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
      };
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/updateItinerary`, data, headers);
      return response.data;
    }
  );
//Delete 
export const  deleteItinerary = createAsyncThunk(
  'tours/itineraryDelete',
  async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "content-type": "application/json", 
      },
    };

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/deleteItinerary`, data, headers);
    return response.data;
  }
);

export const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
 // Reducers for add tour
    .addCase(addItinerary.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(addItinerary.pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(addItinerary.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })
    //reducer for update tour
        .addCase(updateItinerary.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(updateItinerary.pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(updateItinerary.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })


    //Delete
.addCase( deleteItinerary.fulfilled, (state) => {
  state.loading = false;
  state.isRefresh = false;
  state.error = "";
})
.addCase( deleteItinerary.pending, (state) => {
  state.loading = true;
  state.isRefresh = true;
})
.addCase( deleteItinerary.rejected, (state, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
  state.isRefresh = false;
})

  },
})


export default itinerarySlice.reducer;