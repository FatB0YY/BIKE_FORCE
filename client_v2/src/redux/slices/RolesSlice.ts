import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IRole } from '../../types/Role'
import { rolesAPI } from '../../service/RolesAPI'

interface RolesState {
  currentUserRoles: IRole[] | null
}

const initialState: RolesState = {
  currentUserRoles: null,
}

const rolesSlice = createSlice({
  name: 'rolesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      rolesAPI.endpoints.getCurrentUserRoles.matchFulfilled,
      (state, action: PayloadAction<IRole[]>) => {
        state.currentUserRoles = action.payload
      },
    )
  },
})

export const { reducer: rolesReducer, actions: rolesActions } = rolesSlice
