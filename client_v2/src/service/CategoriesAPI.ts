import { ICategory } from '../types/Category'
import { rtkAPI } from './rtkAPI'

export const categoriesAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation<ICategory, string>({
      query: (name) => ({
        url: '/category',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['Categories'],
    }),
    getAllCategories: build.query<ICategory[], void>({
      query: () => ({
        url: '/category',
      }),
      providesTags: ['Categories'],
    }),
    deleteCategory: build.mutation<ICategory, number>({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
})

export const {
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useLazyGetAllCategoriesQuery,
  useGetAllCategoriesQuery,
} = categoriesAPI
