import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  status: null,
  isLoading: false,
  error: null,
  deleteStatus: null,
  editStatus: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`${baseURL}/products`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const CreateProducts = createAsyncThunk(
  "products/CreateProducts",
  async (product) => {
    try {
      const res = await axios.post(
        `${baseURL}/products`,
        product,
        setHeaders()
      );

      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    try {
      const res = await axios.delete(`${baseURL}/products/${id}`, setHeaders());

      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const editProducts = createAsyncThunk(
  "products/EditProducts",
  async (editedProduct) => {
    try {
      const res = await axios.put(
        `${baseURL}/products/${editedProduct.product._id}`,
        editedProduct,
        setHeaders()
      );

      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    //Get Products
    [getProducts.pending]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "rejected";
      state.isLoading = false;
      state.error = action.payload;
    },
    //Create Products
    [CreateProducts.pending]: (state, action) => {
      state.status = "pending";
    },
    [CreateProducts.fulfilled]: (state, action) => {
      state.products.push(action.payload);
      state.status = "success";
      toast.success("Product Created successfully!");
    },
    [CreateProducts.rejected]: (state, action) => {
      state.status = "rejected";
    },
    //Edit Products
    [editProducts.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [editProducts.fulfilled]: (state, action) => {
      const updatedProducts = state.products.map(
        (product) => product._id === action.payload._id ? action.payload : product 
      );
      state.products = updatedProducts;
      state.editStatus = "success";
      toast.success("Product Edited successfully!");
    },
    [editProducts.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
    //Delete Products
    [deleteProducts.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [deleteProducts.fulfilled]: (state, action) => {
      const newProductsList = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.products = newProductsList;
      state.deleteStatus = "success";
      toast.error("Product Deleted successfully!");
    },
    [deleteProducts.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

// export const { getProducts } = productsSlice.actions

export default productsSlice.reducer;
