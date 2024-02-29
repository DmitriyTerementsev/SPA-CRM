import { apiSlice } from './api.ts';

export const subCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubCategories: build.query({
      query: (limit = '') => `subProtocols?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'SubCategories', id })),
              { type: 'SubCategories', id: 'LIST' },
            ]
          : [{ type: 'SubCategories', id: 'LIST' }],
    }),
    addSubCategories: build.mutation({
      query: (body) => ({
        url: 'subProtocols',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'SubCategories', id: 'LIST' }],
    }),
    deleteSubCategories: build.mutation({
      query: (id) => ({
        url: `subProtocols/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'SubCategories', id: 'LIST' }],
    }),
    editSubCategories: build.mutation({
      query: ({ id, data }) => ({
        url: `subProtocols/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [{ type: 'SubCategories', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddSubCategoriesMutation,
  useDeleteSubCategoriesMutation,
  useEditSubCategoriesMutation,
  useGetSubCategoriesQuery,
} = subCategoriesApi;
