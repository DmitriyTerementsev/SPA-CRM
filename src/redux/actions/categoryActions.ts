import { CategoryActionTypes } from "../types/categoryTypes.ts";

export const addCategory = (data: any) => ({
  type: CategoryActionTypes.CATEGORY_ADD,
  payload: { name: data.name, id: data.id, position: data.position },
});

export const deleteCategory = (id: number) => ({
  type: CategoryActionTypes.CATEGORY_DELETE,
  payload: id,
});

export const editCategoryName = (name: string, id: number) => ({
  type: CategoryActionTypes.CATEGORY_EDIT_NAME,
  payload: name,
  id: id,
});