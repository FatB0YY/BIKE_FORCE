import { createSlice } from '@reduxjs/toolkit'
import { IRole } from '../../types/Role'
import { rolesAPI } from '../../service/RolesAPI'

interface RolesState {
  currentUserRoles: IRole[] | null
}

const initialState: RolesState = {
  currentUserRoles: null,
}

export const rolesSlice = createSlice({
  name: 'rolesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(rolesAPI.endpoints.getCurrentUserRoles.matchFulfilled, (state, action) => {
      state.currentUserRoles = action.payload
    })
  },
})

export default rolesSlice.reducer
export const {} = rolesSlice.actions
