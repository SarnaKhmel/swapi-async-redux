import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "http://localhost:1234/",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/login/", params);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/register/", params);
      //   if (data !== 200) throw new Error(data.statusText);
      //   console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/auth/me/");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  data: null,
  status: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = "rejected";
      state.data = null;
    },
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = "rejected";
      state.data = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.status = "rejected";
      state.data = null;
    },
  },
});
export const checkAuth = (state) => Boolean(state.auth.data);

export default authSlice.reducer;
export const { logout } = authSlice.actions;
