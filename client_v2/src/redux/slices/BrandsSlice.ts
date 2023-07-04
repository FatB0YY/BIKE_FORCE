import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { brandsAPI } from '../../service/BrandsAPI'
import { toast } from 'react-toastify'
import { IError, IErrorResponse } from '../../types/Error'

interface IBrandsState {
  BrandId: number | null
}

const initialState: IBrandsState = {
  BrandId: null,
}

export const brandsSlice = createSlice({
  name: 'brandsSlice',
  initialState,
  reducers: {
    setBrandId: (state, action) => {
      state.BrandId = action.payload
    },
  },
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

export default brandsSlice.reducer
export const { setBrandId } = brandsSlice.actions
