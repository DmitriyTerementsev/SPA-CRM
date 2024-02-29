import {
  SubCategoryState,
  SubCategoryActionTypes,
  SubCategoryAction,
} from '../types/subCategoryTypes.ts';
import { subCategoriesList } from '../../constants/subCategoriesList.ts';

const initialState: SubCategoryState = {
  subCategories: subCategoriesList,
  loading: false,
  error: null,
};

export const SubCategoryReducer = (
  state = initialState,
  action: SubCategoryAction
): SubCategoryState => {
  //console.log(action);
  switch (action.type) {
    case SubCategoryActionTypes.FETCH_SUBCATEGORIES:
      return { loading: true, error: null, subCategories: [] };
    case SubCategoryActionTypes.FETCH_SUBCATEGORIES_SUCCESS:
      return { loading: false, error: null, subCategories: action.payload };
    case SubCategoryActionTypes.FETCH_SUBCATEGORIES_ERROR:
      return { loading: false, error: action.payload, subCategories: [] };
    case SubCategoryActionTypes.SUBCATEGORY_ADD:
      return {
        loading: false,
        error: null,
        subCategories: [...state.subCategories, action.payload],
      };
    case SubCategoryActionTypes.SUBCATEGORY_DELETE:
      return {
        loading: false,
        error: null,
        subCategories: [
          ...state.subCategories.filter((each) => each.id !== action.payload),
        ],
      };
    case SubCategoryActionTypes.SUBCATEGORY_EDIT_NAME:
      return {
        loading: false,
        error: null,
        subCategories: state.subCategories.map((item) => {
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
