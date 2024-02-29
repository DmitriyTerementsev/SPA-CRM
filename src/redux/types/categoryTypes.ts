export interface CategoryState {
  categories: any[];
  loading: boolean;
  error: null | string;
}

export enum CategoryActionTypes {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR',
  CATEGORY_ADD = 'CATEGORY_ADD',
  CATEGORY_DELETE = 'CATEGORY_DELETE',
  CATEGORY_EDIT_NAME = 'CATEGORY_EDIT_NAME',
}

interface FetchCategoriesAction {
  type: CategoryActionTypes.FETCH_CATEGORIES;
}

interface FetchCategoriesSuccessAction {
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: any[];
}

interface FetchCategoriesErrorAction {
  type: CategoryActionTypes.FETCH_CATEGORIES_ERROR;
  payload: string;
}
interface CategoryAddAction {
  type: CategoryActionTypes.CATEGORY_ADD;
  payload: any[];
}

interface CategoryDeleteAction {
  type: CategoryActionTypes.CATEGORY_DELETE;
  payload: number;
}

interface CategoryEditNameAction {
  type: CategoryActionTypes.CATEGORY_EDIT_NAME;
  payload: string;
  id: number;
}

export type CategoryAction =
  | FetchCategoriesAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesErrorAction
  | CategoryAddAction
  | CategoryDeleteAction
  | CategoryEditNameAction;
