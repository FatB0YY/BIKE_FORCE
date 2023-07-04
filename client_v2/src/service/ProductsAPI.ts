import { IProduct, IResponseFetchProducts } from '../types/Product'
import { rtkAPI } from './rtkAPI'

export const productsAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<
      IResponseFetchProducts,
      { BrandId?: number; CategoryId?: number; limit: number; page: number }
    >({
      query: ({ BrandId, CategoryId, limit, page }) => ({
        url: `/product?limit=${limit}&page=${page}${BrandId ? `&BrandId=${BrandId}` : ''}${
          CategoryId ? `&CategoryId=${CategoryId}` : ''
        }`,
      }),
      providesTags: ['Products'],
    }),
    createProduct: build.mutation<{ product: IProduct }, FormData>({
      query: (formData) => ({
        url: `/product`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),
    getOneProduct: build.query<IProduct, number>({
      query: (id) => ({
        url: `/product/${id}`,
      }),
    }),
    deleteProduct: build.mutation<IProduct, number>({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
})

export const { useDeleteProductMutation, useGetAllProductsQuery, useCreateProductMutation, useGetOneProductQuery } =
  productsAPI
