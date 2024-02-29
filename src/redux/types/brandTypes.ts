export interface BrandState {
  brands: any[];
  loading: boolean;
  error: null | string;
}

export enum BrandActionTypes {
  FETCH_BRANDS = 'FETCH_BRANDS',
  FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS',
  FETCH_BRANDS_ERROR = 'FETCH_BRANDS_ERROR',
  BRAND_ADD = 'BRAND_ADD',
  BRAND_DELETE = 'BRAND_DELETE',
  BRAND_EDIT_LOGO = 'BRAND_EDIT_LOGO',
  BRAND_EDIT_NAME = 'BRAND_EDIT_NAME',
}

interface FetchBrandsAction {
  type: BrandActionTypes.FETCH_BRANDS;
}

interface FetchBrandsSuccessAction {
  type: BrandActionTypes.FETCH_BRANDS_SUCCESS;
  payload: any[];
}

interface FetchBrandsErrorAction {
  type: BrandActionTypes.FETCH_BRANDS_ERROR;
  payload: string;
}
interface BrandAddAction {
  type: BrandActionTypes.BRAND_ADD;
  payload: any[];
}

interface BrandDeleteAction {
  type: BrandActionTypes.BRAND_DELETE;
  payload: number;
}

interface BrandEditNameAction {
  type: BrandActionTypes.BRAND_EDIT_NAME;
  payload: string;
  id: number;
}

interface BrandEditLogoAction {
  type: BrandActionTypes.BRAND_EDIT_LOGO;
  payload: string;
  id: number;
}

export type BrandAction =
  | FetchBrandsAction
  | FetchBrandsSuccessAction
  | FetchBrandsErrorAction
  | BrandAddAction
  | BrandDeleteAction
  | BrandEditLogoAction
  | BrandEditNameAction;
