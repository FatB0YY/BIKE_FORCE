import { createAsyncThunk } from '@reduxjs/toolkit'

export const asyncThunk = createAsyncThunk('asyncThunk', async (file: any, thunkAPI) => {
  try {
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: 'Ошибка' })
  }
})
