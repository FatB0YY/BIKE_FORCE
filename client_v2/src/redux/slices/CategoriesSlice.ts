import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { categoriesAPI } from '../../service/CategoriesAPI'
import { IError } from '../../types/Error'
import { toast } from 'react-toastify'

const initialState = {}

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(categoriesAPI.endpoints.createCategory.matchRejected, (state, action: PayloadAction<any>) => {
      action.payload?.data.errors.forEach((error: IError) => {
        toast.error(error.message)
      })
    })
    builder.addMatcher(categoriesAPI.endpoints.deleteCategory.matchRejected, (state, action: PayloadAction<any>) => {
      action.payload?.data.errors.forEach((error: IError) => {
        toast.error(error.message)
      })
    })
    builder.addMatcher(categoriesAPI.endpoints.getAllCategories.matchRejected, (state, action: PayloadAction<any>) => {
      action.payload?.data.errors.forEach((error: IError) => {
        toast.error(error.message)
      })
    })
  },
})

export const { reducer: categoriesReducer, actions: categoriesActions } = categoriesSlice
