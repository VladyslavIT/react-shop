import axios from 'axios';
import { BASE_URL } from 'utils/constants';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const createUser = createAsyncThunk(
  'users/createUser',
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, body);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (body, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, body);
      const login = await axios(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${response.data.access_token}` },
      });
      return login.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (body, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${body.id}`, body);
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
    showForm: false,
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
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
    removeItemFromCart: (state, {payload}) => {
    state.cart = state.cart.filter(({id}) => id !== payload);
    }
  },
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
      state.isLoading = false;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
      state.isLoading = false;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
      state.isLoading = false;
    });
  },
});

export const { addItemToCart, toggleForm, toggleFormType, removeItemFromCart } = userSlice.actions;

export default userSlice.reducer;
