import { combineReducers } from 'redux';
import citySlice from '../slices/citySlice.ts';
import orderSlice from '../slices/orderSlice.ts'

export const rootReducer = combineReducers({
  order: orderSlice,
  city: citySlice,
});

export type RootState = ReturnType<typeof rootReducer>;
