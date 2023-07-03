import axios from 'axios';
import { BASE_URL } from 'utils/constants';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const createUser = createAsyncThunk(
  'users/createUser',
  async (body, thunkAPI) => {
    try {
      const response = await axios(`${BASE_URL}/users`, body);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: 'signup',
    showForm: false
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);
      if (found) {
        newCart = newCart.map(item =>
          item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item
        );
      } else newCart.push({ ...payload, quantity: 1 });
      state.cart = newCart;
    },
    toggleForm: (state, {payload}) => {
      state.showForm = payload;
    }
  },
  extraReducers: builder => {
    // builder.addCase(getCategories.pending, (state) => {
    //     state.isLoading = true;
    // });
    builder.addCase(createUser.fulfilled, (state, {payload}) => {
        state.currentUser = payload;
        state.isLoading = false;
    });
    // builder.addCase(getCategories.rejected, (state) => {
    //     state.list = false;
    //     console.log('ERROR CATEGORIES SLICE');
    // });
  },
});

export const { addItemToCart, toggleForm } = userSlice.actions;

export default userSlice.reducer;
