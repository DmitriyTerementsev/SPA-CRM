import { BrandActionTypes } from "../types/brandTypes.ts";

export const addBrand = (data: any) => ({
  type: BrandActionTypes.BRAND_ADD,
  payload: { name: data.brandName, id: data.id, logo: data.logo },
});

export const deleteBrand = (id: number) => ({
  type: BrandActionTypes.BRAND_DELETE,
  payload: id,
});

export const editBrandName = (name: string, id: number) => ({
  type: BrandActionTypes.BRAND_EDIT_NAME,
  payload: name,
  id: id,
});


export const editBrandLogo = (logo: string, id: number) => ({
  type: BrandActionTypes.BRAND_EDIT_LOGO,
  payload: logo,
  id: id,
});