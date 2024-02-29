import { SubCategoryActionTypes } from "../types/subCategoryTypes.ts";

export const addSubCategory = (data: any) => ({
  type: SubCategoryActionTypes.SUBCATEGORY_ADD,
  payload: {
    id: data.id,
    name: data.name,
    position: data.position,
    catalog_product: { id: data.id },
  },
});

export const deleteSubCategory = (id: number) => ({
  type: SubCategoryActionTypes.SUBCATEGORY_DELETE,
  payload: id,
});

export const editSubCategoryName = (name: string, id: number) => ({
  type: SubCategoryActionTypes.SUBCATEGORY_EDIT_NAME,
  payload: name,
  id: id,
});