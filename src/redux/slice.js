import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlanets = createAsyncThunk(
  "planets/fetchPlanets",
  async function (param, { rejectWithValue, getState }) {
    if (param === "") param = "planets";
    const id = getState().planets.page;
    try {
      const response = await axios.get(`https://swapi.dev/api/${param}/${id}`);
      if (response.status !== 200) throw new Error(response.statusText);
      const data = response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const planetSlice = createSlice({
  name: "fetch-slice",
  initialState: {
    status: null,
    error: null,
    data: [],
    page: 1,
  },

  reducers: {
    increment(state) {
      state.page++;
    },
    decrement(state) {
      state.page--;
    },
    init(state) {
      state.page = 1;
    },
  },

  extraReducers: {
    [fetchPlanets.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchPlanets.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.data = action.payload;
    },
    [fetchPlanets.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { increment, decrement, init } = planetSlice.actions;
export default planetSlice.reducer;
