import { SerializedError, createSlice } from '@reduxjs/toolkit';
import {
  getCities,
  fetchCities,
  addCity,
  deleteCity,
} from '../thunks/cityThunk.ts';
import { City } from '../../interfaces/City.ts';

interface CityState {
  cities: City[];
  isLoading: boolean;
  isError: null | SerializedError;
}

let initialState: CityState = {
  isLoading: false,
  isError: null,
  cities: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCities.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cities = action.payload;
    });
    builder.addCase(getCities.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });

    builder.addCase(fetchCities.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cities = action.payload;
    });
    builder.addCase(fetchCities.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });

    builder.addCase(addCity.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addCity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cities.push(action.payload);
    });
    builder.addCase(addCity.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });

    builder.addCase(deleteCity.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cities = state.cities.filter((ele) => ele.id !== action.payload);
    });
    builder.addCase(deleteCity.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
  },
});

export default citySlice.reducer;
