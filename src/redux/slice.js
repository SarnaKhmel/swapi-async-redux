import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlanets = createAsyncThunk(
  "planets/fetchPlanets",
  async function (_, { rejectWithValue, getState }) {
    const id = getState().planets.page;
    try {
      const response = await axios.get(`https://swapi.dev/api/planets/${id}`);
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
      if (state.page <= 0 && state.page >= 60) state.page = 1;
      state.page++;
    },
    decrement(state) {
      if (state.page <= 0 && state.page >= 60) state.page = 1;
      state.page--;
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

export const { increment, decrement } = planetSlice.actions;
export default planetSlice.reducer;
