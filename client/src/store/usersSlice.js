import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  status: null,
  isLoading: false,
  error: null,
  deleteStatus: null,
  editStatus: null,
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`${baseURL}/users`, setHeaders());
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);



export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id) => {
      try {
        const res = await axios.delete(`${baseURL}/users/${id}`, setHeaders());
  
        return res.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  );

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    //Get users
    [getUsers.pending]: (state, action) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "rejected";
      state.isLoading = false;
      state.error = action.payload;
    },
  },
   //Delete users
   [deleteUser.pending]: (state, action) => {
    console.log(action)
    state.deleteStatus = "pending";
  },
  [deleteUser.fulfilled]: (state, action) => {
    console.log(action.payload)

    const newUsersList = state.users.filter(
      (user) => user._id !== action.payload._id
    );
    state.users = newUsersList;
    state.deleteStatus = "success";
    toast.error("user Deleted successfully!", {
        position: "bottom-left"
    });
  },
  [deleteUser.rejected]: (state, action) => {
    console.log(action)

    state.deleteStatus = "rejected";
  },
});

export default usersSlice.reducer;
