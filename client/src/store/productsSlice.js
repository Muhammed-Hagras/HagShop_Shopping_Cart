import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const baseURL = "http://localhost:8000/products";

const initialState= { products: [], status: null, isLoading: false, error: null }

export const getProducts = createAsyncThunk("products/getProducts", async (_, thunkAPI) =>{
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(baseURL);
        return res.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [getProducts.pending]: (state,action) => {
            state.status = "pending";
            state.isLoading = true;
        },
        [getProducts.fulfilled]: (state,action) => {
            state.status = "success";
            state.isLoading = false; 
            state.products = action.payload;
        },
        [getProducts.rejected]: (state,action) => {
            state.status = "rejected";
            state.isLoading = false;
            state.error = action.payload

        }
    }
})

// export const { getProducts } = productsSlice.actions

export default productsSlice.reducer;