import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isModal: false,
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setIsModal: (state, action: PayloadAction<boolean>) => {
      state.isModal = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { reducer: appReducer, actions: appActions } = appSlice
