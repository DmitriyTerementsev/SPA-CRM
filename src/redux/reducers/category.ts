import {
  CategoryState,
  CategoryActionTypes,
  CategoryAction,
} from '../types/categoryTypes.ts';
import { categoriesList } from '../../constants/categoriesList.ts';

const initialState: CategoryState = {
  categories: categoriesList,
  loading: false,
  error: null,
};

export const CategoryReducer = (
  state = initialState,
  action: CategoryAction
): CategoryState => {
  //console.log(action);
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORIES:
      return { loading: true, error: null, categories: [] };
    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { loading: false, error: null, categories: action.payload };
    case CategoryActionTypes.FETCH_CATEGORIES_ERROR:
      return { loading: false, error: action.payload, categories: [] };
    case CategoryActionTypes.CATEGORY_ADD:
      return {
        loading: false,
        error: null,
        categories: [...state.categories, action.payload],
      };
    case CategoryActionTypes.CATEGORY_DELETE:
      return {
        loading: false,
        error: null,
        categories: [
          ...state.categories.filter((each) => each.id !== action.payload),
        ],
      };
    case CategoryActionTypes.CATEGORY_EDIT_NAME:
      return {
        loading: false,
        error: null,
        categories: state.categories.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              name: action.payload,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
