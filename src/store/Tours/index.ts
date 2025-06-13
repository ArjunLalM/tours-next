/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
import qs from "qs";
export interface TourState {
    data : [], 
     searchResult: [],// store all books data
    params: any,
    tourData : any // store single book data
    loading : boolean,
    isRefresh: boolean
    error : string | null
    totalTours: number;
    bookedCount: number;
}

const initialState: TourState = {
    data: [],
     searchResult: [],
    params: {},
    tourData : {},
    loading: false,
    isRefresh: false,
    totalTours: 0,
      bookedCount: 0,
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

export const ListTourAction = createAsyncThunk(
  'tours/listTour',
  async (filters: any, {}: Redux) => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "content-type": "application/json"
      }
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/getAllTours`,
      filters,
      headers
    );

    return response.data;
  }
);

//top rated tours
export const ListTopRatedTourAction = createAsyncThunk(
  'tours/listTopRatedTour',
  async (filters: any, {}: Redux) => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "content-type": "application/json"
      }
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/topRatedTour`,
      filters,
      headers
    );

    return response.data;
  }
);

//List tours filtering


export const ListTourActionFilter = createAsyncThunk(
  "books/listTourFilter",
  async (filters: any, { rejectWithValue }) => {
    try {
      const storedToken = localStorage.getItem("token");

      const queryString = qs.stringify(filters, { arrayFormat: "comma" }); 
      // converts {categories: ["beach","mountain"], minPrice: 100} to
      // categories=beach,mountain&minPrice=100

      const headers = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
           "content-type": "multipart/form-data"
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/filter?${queryString}`,
        headers
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch tours");
    }
  }
);

//Edit Tour
export const EditTourAction = createAsyncThunk(
    'tour/editTour',
    async ({ data }: { data: FormData }, { }: Redux) => {
      const storedToken = localStorage.getItem('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
         'Content-Type': 'application/json'
        },
      };
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/updateTour`, data, headers);
      return response.data;
    }
  );

  //view Tour 
  export const viewTourAction = createAsyncThunk(
  'tour/view',
  async (data: any , { }: Redux) => {
  const storedToken = localStorage.getItem('token')
      const headers = {
          headers: {
              Authorization: `Bearer ${storedToken}`,
          }
      }

  const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/viewTour`, data, headers)
  
  return response.data

},

)
export const SearchTourAction = createAsyncThunk(
  'tours/searchTour',
  async (query: string, thunkAPI) => {
    try {
      const storedToken = localStorage.getItem('token');

      const headers = {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/searchTour?search=${query}`,
        { headers }
      );

      // 👇 Fix: only return the tour list
      return response.data.data;
    } catch (error: any) {
      console.error('Search API Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || 'Search failed');
    }
  }
);

//Availability 
export const TourAvailableAction = createAsyncThunk(
  'tours/TourAvailableAction',
  async ({ tourId }: { tourId: string }, {}: Redux) => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
       
      },
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/booked-count`,
      { tourId },
      headers
    );

    return response.data;
  }
);

//Delete 
export const  deleteTour = createAsyncThunk(
  'tours/tourDelete',
  async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "content-type": "application/json", 
      },
    };

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tours/delete`, data, headers);
    return response.data;
  }
);

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
        //Delete
    .addCase( deleteTour.fulfilled, (state) => {
      state.loading = false;
      state.isRefresh = false;
      state.error = "";
    })
    .addCase( deleteTour.pending, (state) => {
      state.loading = true;
      state.isRefresh = true;
    })
    .addCase( deleteTour.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.isRefresh = false;
    })
    //reducer for update tour
        .addCase(EditTourAction.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(EditTourAction.pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(EditTourAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })
    // Reducers for List tour
    .addCase(ListTourAction.fulfilled,  (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
       state.data = action.payload
      state.totalTours = action.payload.totalTours || 0;
    })
    .addCase(ListTourAction.pending, (state) => {
        state.loading = true
       
    })
    .addCase(ListTourAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
    })

        // Reducers for List TopRatedTour
    .addCase(ListTopRatedTourAction.fulfilled,  (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
       state.data = action.payload.data
        state.totalTours = action.payload.totalTours || 0;
    })
    .addCase(ListTopRatedTourAction.pending, (state) => {
        state.loading = true
       
    })
    .addCase(ListTopRatedTourAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
    })



     // Reducer for view books
.addCase(viewTourAction.fulfilled, (state, action:PayloadAction<any>) => {
      state.loading = false
      state.error = ""
      state.tourData = action.payload.data
      state.params = action.payload.params
})
 
.addCase(ListTourActionFilter.fulfilled, (state, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = "";
  state.data = action.payload.data;
  state.totalTours = action.payload.totalBooks || 0;
})
.addCase(ListTourActionFilter.pending, (state) => {
  state.loading = true;
})
.addCase(ListTourActionFilter.rejected, (state, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
})

 .addCase(TourAvailableAction.fulfilled,  (state, action: PayloadAction<any>) => {
    state.loading = false;
    state.error = "";
    state.bookedCount = action.payload.bookedCount || 0;
})
.addCase(TourAvailableAction.pending, (state) => {
    state.loading = true;
})
.addCase(TourAvailableAction.rejected, (state, action: PayloadAction<any>) => {
    state.loading = false;
    state.error = action.payload;
})

 // Reducers for List tour
.addCase(SearchTourAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(SearchTourAction.fulfilled, (state, action) => {
      state.loading = false;
      state. searchResult = action.payload;
    })
    .addCase(SearchTourAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

     // Reducers for add tour
 
    
      },
})


export default tourSlice.reducer;