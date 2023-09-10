import { createAsyncThunk } from '@reduxjs/toolkit'

export const asyncThunk = createAsyncThunk('asyncThunk', async (data: any, thunkAPI) => {
  try {
    return null
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: 'Ошибка' })
  }
})
