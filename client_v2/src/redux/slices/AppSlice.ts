import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isModal: false,
}

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setIsModal: (state, action: PayloadAction<boolean>) => {
      state.isModal = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export default appSlice.reducer
export const { setIsModal } = appSlice.actions
