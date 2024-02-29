import { SerializedError, createSlice } from '@reduxjs/toolkit';
import {
  getOrders,
  fetchOrders,
  editOrderName,
  editOrderNumber,
} from '../thunks/orderThunk.ts';

import { Order } from '../../interfaces/Order.ts';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  isError: null | SerializedError;
}

let initialState: OrderState = {
  isLoading: false,
  isError: null,
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });

    builder.addCase(fetchOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });

    builder.addCase(editOrderName.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editOrderName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = state.orders.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            user: action.payload,
          };
        }
        return item;
      });
    });
    builder.addCase(editOrderName.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });

    builder.addCase(editOrderNumber.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editOrderNumber.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = state.orders.map((item) => {
        if (item.id === action.payload.id) {
          console.log(item);
          return {
            ...item,
            order_number: action.payload.order,
          };
        }
        return item;
      });
    });
    builder.addCase(editOrderNumber.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
  },
});

export default orderSlice.reducer;
