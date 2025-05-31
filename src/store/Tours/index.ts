/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"

export interface TourState {
    data : []  , // store all books data
    params: any,
    tourData : any // store single book data
    loading : boolean,
    isRefresh: boolean
    error : string | null
    totalTours: number;
}

const initialState: TourState = {
    data: [],
    params: {},
    tourData : {},
    loading: false,
    isRefresh: false,
    totalTours: 0,
    error: ""
}

interface Redux {
    getState : any,
    dispatch : Dispatch<any>
}

// addTours 
export const AddTourAction = createAsyncThunk(
    'tour/addTour',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "content-type": "multipart/form-data"
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/addTour`, data, headers)
     console.log(response.data)
    return response.data
   
  },
)

//List tours 
export const ListTourAction = createAsyncThunk(
    'tours/listTour',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "content-type": "multipart/form-data"
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/getAllTours`, data, headers)
    
    return response.data
  },
)




export const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
 // Reducers for add tour
    .addCase(AddTourAction.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(AddTourAction.pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(AddTourAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })
    // Reducers for List tour
    .addCase(ListTourAction.fulfilled,  (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
       state.data = action.payload.data
        state.totalTours = action.payload.totalTours || 0;
    })
    .addCase(ListTourAction.pending, (state) => {
        state.loading = true
       
    })
    .addCase(ListTourAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
    })


 
 

  },
})


export default tourSlice.reducer;