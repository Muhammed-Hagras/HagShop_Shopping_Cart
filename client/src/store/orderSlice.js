import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  orders: [],
  status: null,
  isLoading: false,
  error: null,
  deleteStatus: null,
  editStatus: null,
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`${baseURL}/orders`, setHeaders());
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const editorders = createAsyncThunk(
  "orders/editorders",
  async (editedOrder, { getState }) => {
    const state = getState();

    let currentOrder = state.OrdersReducer.orders.filter(
      (order) => order._id === editedOrder.id
    );
    try {
      const newOrder = {
        ...currentOrder[0],
        delivery_status: editedOrder.delivery_status,
      };

      const res = await axios.put(
        `${baseURL}/orders/${editedOrder.id}`,
        newOrder,
        setHeaders()
      );
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    //Get orders
    [getOrders.pending]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.orders = action.payload;
    },
    [getOrders.rejected]: (state, action) => {
      state.status = "rejected";
      state.isLoading = false;
      state.error = action.payload;
    },
    //Edit orders
    [editorders.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [editorders.fulfilled]: (state, action) => {
      const updatedorders = state.orders.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      state.orders = updatedorders;
      state.editStatus = "success";
      toast.success("order Edited successfully!");
    },
    [editorders.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});

// export const { getOrders } = ordersSlice.actions

export default ordersSlice.reducer;
