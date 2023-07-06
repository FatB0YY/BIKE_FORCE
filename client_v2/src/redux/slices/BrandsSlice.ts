import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { brandsAPI } from '../../service/BrandsAPI'
import { toast } from 'react-toastify'
import { IError } from '../../types/Error'

const initialState = {}

const brandsSlice = createSlice({
  name: 'brandsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(brandsAPI.endpoints.createBrand.matchRejected, (state, action: PayloadAction<any>) => {
      action.payload?.data.errors.forEach((error: IError) => {
        toast.error(error.message)
      })
    })
    builder.addMatcher(brandsAPI.endpoints.deleteBrand.matchRejected, (state, action: PayloadAction<any>) => {
      action.payload?.data.errors.forEach((error: IError) => {
        toast.error(error.message)
      })
    })
    builder.addMatcher(brandsAPI.endpoints.getAllBrands.matchRejected, (state, action: PayloadAction<any>) => {
      action.payload?.data.errors.forEach((error: IError) => {
        toast.error(error.message)
      })
    })
  },
})

export const { reducer: brandsReducer, actions: brandsActions } = brandsSlice
