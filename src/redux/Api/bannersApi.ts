import { apiSlice } from './api.ts';

export const bannersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBanners: build.query({
      query: (limit = '') => `banners?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Banners', id })),
              { type: 'Banners', id: 'LIST' },
            ]
          : [{ type: 'Banners', id: 'LIST' }],
    }),
    addBanners: build.mutation({
      query: (body) => ({
        url: 'banners',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Banners', id: 'LIST' }],
    }),
    deleteBanners: build.mutation({
      query: (id) => ({
        url: `banners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Banners', id: 'LIST' }],
    }),
    editBanners: build.mutation({
      query: ({ id, data }) => ({
        url: `banners/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [{ type: 'Banners', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddBannersMutation,
  useDeleteBannersMutation,
  useEditBannersMutation,
  useGetBannersQuery,
} = bannersApi;
