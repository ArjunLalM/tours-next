/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"

export interface TourState {
    data : []  , // store all books data
    params: any,
    bookingData : any // store single book data
    loading : boolean,
    isRefresh: boolean
    error : string | null
    totalTours: number;
}

const initialState: TourState = {
    data: [],
    params: {},
    bookingData : {},
    loading: false,
    isRefresh: false,
    totalTours: 0,
    error: ""
}

interface Redux {
    getState : any,
    dispatch : Dispatch<any>
}

// add Booking
export const AddBookingAction = createAsyncThunk(
    'booking/addBooking',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
               'Content-Type': 'application/json'
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/addBooking`, data, headers)
     console.log(response.data)
    return response.data
   
  },
)
//add booking Using stripe
export const CreateStripeBookingAction = createAsyncThunk(
    'booking/addBookingStripe',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
               'Content-Type': 'application/json'
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/stripeSession`, data, headers)
     console.log(response.data)
    return response.data
   
  },
)

//List Operator Bookings
export const ListOperatorBookingAction = createAsyncThunk(
    'booking/listBooking',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            }
        }
    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/getMyBookingsOperator`, data, headers)
    
    return response.data
  },
)

//Edit booking
export const EditBookingAction = createAsyncThunk(
    'booking/updateBooking',
    async ( data: any , { }: Redux) => {
      const storedToken = localStorage.getItem('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          
        },
      };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/verifyAndAcceptTourBooking`, data, headers);
      return response.data;
    }
  );
//list my booking user

export const ListUserBookingAction = createAsyncThunk(
  'booking/listBookingUser',
  async () => {
    const storedToken = localStorage.getItem('token');

    const headers = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/getMyBookings`,
      headers
    );

    return response.data;
  }
);

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
 // Reducers for add tour
    .addCase(AddBookingAction.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(AddBookingAction.pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(AddBookingAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })
     // Reducers for booking stripe
    .addCase(CreateStripeBookingAction.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(CreateStripeBookingAction.pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(CreateStripeBookingAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })
    //reducer for update tour
        .addCase(EditBookingAction.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(EditBookingAction .pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(EditBookingAction .rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })
    // Reducers for List tour
    .addCase(ListOperatorBookingAction.fulfilled,  (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
       state.data = action.payload.data
      
    })
    .addCase(ListOperatorBookingAction.pending, (state) => {
        state.loading = true
       
    })
    .addCase(ListOperatorBookingAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
    })

     // Reducers for List tour user
    .addCase( ListUserBookingAction.fulfilled,  (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
       state.data = action.payload.data
      
    })
    .addCase( ListUserBookingAction.pending, (state) => {
        state.loading = true
       
    })
    .addCase( ListUserBookingAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
    })
 

  },
})


export default bookingSlice.reducer;