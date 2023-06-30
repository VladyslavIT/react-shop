import axios from 'axios';
import { shuffle } from 'utils/common';
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
    filtered: [],
    related: [],
    isLoading: false,
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },
    getRelatedProducts: (state, {payload}) => {
      const list = state.list.filter(({category: {id}}) => id === payload); 
      state.related = shuffle(list);

    }
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, state => {
      state.list = false;
      console.log('ERROR Products SLICE');
    });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;
