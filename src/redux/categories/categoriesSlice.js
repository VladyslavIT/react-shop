import axios from 'axios';
import { BASE_URL } from 'utils/constants';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios(`${BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    isLoading: false,
  },
  extraReducers: builder => {
    builder.addCase(getCategories.pending, (state) => {
        state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state) => {
        state.list = false;
        console.log('ERROR CATEGORIES SLICE');
    });
  },
});

export default categoriesSlice.reducer;
