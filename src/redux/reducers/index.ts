import { combineReducers } from 'redux';
import { BrandReducer } from './brands.ts';
import { CategoryReducer } from './category.ts';
import { SubCategoryReducer } from './subCategory.ts';
import { OrderReducer } from './orders.ts';

export const rootReducer: any = combineReducers({
  brand: BrandReducer,
  category: CategoryReducer,
  subCategory: SubCategoryReducer,
  order: OrderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
