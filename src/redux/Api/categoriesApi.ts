import { apiSlice } from './api.ts';

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: (limit = '') => `protocols?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Categories', id })),
              { type: 'Categories', id: 'LIST' },
            ]
          : [{ type: 'Categories', id: 'LIST' }],
    }),
    addCategories: build.mutation({
      query: (body) => ({
        url: 'protocols',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    deleteCategories: build.mutation({
      query: (id) => ({
        url: `protocols/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    editCategories: build.mutation({
      query: ({ id, data }) => ({
        url: `protocols/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddCategoriesMutation,
  useDeleteCategoriesMutation,
  useGetCategoriesQuery,
  useEditCategoriesMutation,
} = categoriesApi;
