import {
  BrandState,
  BrandActionTypes,
  BrandAction,
} from '../types/brandTypes.ts';

const initialState: BrandState = {
  brands: [],
  loading: false,
  error: null,
};

export const BrandReducer = (
  state = initialState,
  action: BrandAction
): BrandState => {
  switch (action.type) {
    case BrandActionTypes.FETCH_BRANDS:
      return { loading: true, error: null, brands: [] };
    case BrandActionTypes.FETCH_BRANDS_SUCCESS:
      return { loading: false, error: null, brands: action.payload };
    case BrandActionTypes.FETCH_BRANDS_ERROR:
      return { loading: false, error: action.payload, brands: [] };
    case BrandActionTypes.BRAND_ADD:
      return {
        loading: false,
        error: null,
        brands: [...state.brands, action.payload],
      };
    case BrandActionTypes.BRAND_DELETE:
      return {
        loading: false,
        error: null,
        brands: [...state.brands.filter((each) => each.id !== action.payload)],
      };
    case BrandActionTypes.BRAND_EDIT_NAME:
      return {
        loading: false,
        error: null,
        brands: state.brands.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              name: action.payload,
            };
          }
          return item;
        }),
      };
    case BrandActionTypes.BRAND_EDIT_LOGO:
      return {
        loading: false,
        error: null,
        brands: state.brands.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              logo: action.payload,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
