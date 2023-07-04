import { IBrand } from '../types/Brand'
import { rtkAPI } from './rtkAPI'

export const brandsAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    createBrand: build.mutation<IBrand, string>({
      query: (name) => ({
        url: '/brand',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['Brands'],
    }),
    getAllBrands: build.query<IBrand[], void>({
      query: () => ({
        url: '/brand',
      }),
      providesTags: ['Brands'],
    }),
    deleteBrand: build.mutation<IBrand, number>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Brands'],
    }),
  }),
})

export const { useGetAllBrandsQuery, useDeleteBrandMutation, useCreateBrandMutation, useLazyGetAllBrandsQuery } =
  brandsAPI
