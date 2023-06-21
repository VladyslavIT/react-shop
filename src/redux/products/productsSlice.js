import axios from 'axios';
import { BASE_URL } from 'utils/constants';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios(`${BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    // filtered: [],
    // related: [],
    isLoading: false,
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state) => {
        state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
        state.list = false;
        console.log('ERROR Products SLICE');
    });
  },
});

export default productsSlice.reducer;