import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllNews = createAsyncThunk('getAllNews', async (_, thunkAPI) => {
  try {
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
})
