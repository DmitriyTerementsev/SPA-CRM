export interface SubCategoryState {
  subCategories: any[];
  loading: boolean;
  error: null | string;
}

export enum SubCategoryActionTypes {
  FETCH_SUBCATEGORIES = 'FETCH_SUBCATEGORIES',
  FETCH_SUBCATEGORIES_SUCCESS = 'FETCH_SUBCATEGORIES_SUCCESS',
  FETCH_SUBCATEGORIES_ERROR = 'FETCH_SUBCATEGORIES_ERROR',
  SUBCATEGORY_ADD = 'SUBCATEGORY_ADD',
  SUBCATEGORY_DELETE = 'SUBCATEGORY_DELETE',
  SUBCATEGORY_EDIT_NAME = 'SUBCATEGORY_EDIT_NAME',
}

interface FetchSubCategoriesAction {
  type: SubCategoryActionTypes.FETCH_SUBCATEGORIES;
}

interface FetchSubCategoriesSuccessAction {
  type: SubCategoryActionTypes.FETCH_SUBCATEGORIES_SUCCESS;
  payload: any[];
}

interface FetchSubCategoriesErrorAction {
  type: SubCategoryActionTypes.FETCH_SUBCATEGORIES_ERROR;
  payload: string;
}
interface SubCategoryAddAction {
  type: SubCategoryActionTypes.SUBCATEGORY_ADD;
  payload: any[];
}

interface SubCategoryDeleteAction {
  type: SubCategoryActionTypes.SUBCATEGORY_DELETE;
  payload: number;
}

interface SubCategoryEditNameAction {
  type: SubCategoryActionTypes.SUBCATEGORY_EDIT_NAME;
  payload: string;
  id: number;
}

export type SubCategoryAction =
  | FetchSubCategoriesAction
  | FetchSubCategoriesSuccessAction
  | FetchSubCategoriesErrorAction
  | SubCategoryAddAction
  | SubCategoryDeleteAction
  | SubCategoryEditNameAction;
