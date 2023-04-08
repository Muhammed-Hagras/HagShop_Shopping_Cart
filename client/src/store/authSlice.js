import { baseURL } from "./api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  password: "",
  registerStatus: "",
  loginStatus: "",
  registerError: "",
  loginError: "",
  isAdmin: false,
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    // const { rejectWithValue } = thunkAPI;
    try {
      const token = await axios.post(`${baseURL}/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const token = await axios.post(`${baseURL}/login`, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
        ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          userLoaded: true,
        };
      } else { 
        return {
        ...state,
          userLoaded: false,
        };
      }
    },
    logoutUser: (state, action) => {
      // localStorage.removeItem("cartItems")
      localStorage.removeItem("token");   
      return {
        token: "",
        name: "",
        email: "",
        _id: "",
        isAdmin: false,
        registerStatus: "",
        loginStatus: "",
        registerError: "",
        loginError: "",
        userLoaded: false,
      }
    }
  },
  extraReducers: (builder) => {
    //Register
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log(action)
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    //Login
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload
      };
    });
  }
});

export const { logoutUser, loadUser }  = authSlice.actions;
export default authSlice.reducer;

