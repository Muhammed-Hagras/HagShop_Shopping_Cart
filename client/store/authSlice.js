import { baseURL } from "./api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

// const initialState = {
//   token: localStorage.getItem("token"),
//   name: "",
//   email: "",
//   password: "",
//   registerStatus: "",
//   loginStatus: "",
//   registerError: "",
//   loginError: "",
//   userLoaded: false,
// };

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (user, thunkAPI) => {
//     console.log({user} + "thunk")
//     const { rejectWithValue } = thunkAPI;
//     try {
//       console.log({user} + "try")
//       const token = await axios.post(`${baseURL}/register`, {
//         name: user.name,
//         email: user.email,
//         password: user.password,
//       });

//       localStorage.setItem("token", token.data);

//       return token.data;
//     } catch (error) {
//       console.log(error.response.data);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(registerUser.pending, (state, action) => {
//       console.log(action)
//       return { ...state, registerStatus: "pending" };
//     });
//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       console.log(action)
//       if (action.payload) {
//         const user = jwtDecode(action.payload);
//         return {
//           ...state,
//           token: action.payload,
//           name: user.name,
//           email: user.email,
//           _id: user._id,
//           registerStatus: "success",
//         };
//       } else return state;
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//       console.log(action)
//       return {
//         ...state,
//         registerStatus: "rejected",
//         registerError: action.payload,
//       };
//     });
//   }
// });

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  password: "",
  _id: "",
  isAdmin: false,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    console.log({user} + "thunk")
    try {
      const token = await axios.post(`${url}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);
      console.log(token)
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${baseURL}/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = await axios.get(`${baseURL}/user/${id}`, setHeaders());

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
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
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        isAdmin: false,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(registerUser.pending, (state, action) => {
  //     console.log(action)

  //     return { ...state, registerStatus: "pending" };
  //   });
  //   builder.addCase(registerUser.fulfilled, (state, action) => {
  //     console.log(action)
  //     if (action.payload) {
  //       const user = jwtDecode(action.payload);
  //       return {
  //         ...state,
  //         token: action.payload,
  //         name: user.name,
  //         email: user.email,
  //         _id: user._id,
  //         isAdmin: user.isAdmin,
  //         registerStatus: "success",
  //       };
  //     } else return state;
  //   });
  //   builder.addCase(registerUser.rejected, (state, action) => {
  //     console.log(action)
  //     return {
  //       ...state,
  //       registerStatus: "rejected",
  //       registerError: action.payload,
  //     };
  //   });
  // },
  extraReducers: {
    //fetch posts
    [registerUser.pending]: (state) => {
      console.log(action)
      state.registerStatus="pending";
    },
    [registerUser.fulfilled]: (state, action) => {
      console.log(action)

      state.registerStatus= "success",
      state.token = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      console.log(action)

      state.registerStatus="rejected";
      state.registerError = action.payload;
    },
  }
});

export default authSlice.reducer;

