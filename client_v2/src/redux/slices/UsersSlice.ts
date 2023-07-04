import { createSlice } from '@reduxjs/toolkit'
import { rolesAPI } from '../../service/RolesAPI'
import { IRole } from '../../types/Role'
import { toast } from 'react-toastify'

interface IUsersState {
  currentUserBan: number | null
  boardAllRoles: any[]
  boardCurrentUserRoles: any[]
  currentRole: IRole | null
}

const initialState: IUsersState = {
  currentUserBan: null,
  boardAllRoles: [],
  boardCurrentUserRoles: [],
  currentRole: null,
}

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setCurrentUserBan: (state, action) => {
      state.currentUserBan = action.payload
    },

    setCurrentRole: (state, action) => {
      state.currentRole = action.payload
    },

    pushToBoardCurrentUserRoles: (state, action) => {
      state.boardCurrentUserRoles.push(action.payload)
    },

    removeRoleFromBoardAllRoles: (state, action) => {
      state.boardAllRoles = state.boardAllRoles.filter((role) => role.id !== action.payload.id)
    },
  },
  extraReducers: (builder) => {
    // Fulfilled
    builder.addMatcher(rolesAPI.endpoints.getAllRoles.matchFulfilled, (state, action) => {
      state.boardAllRoles = action.payload
    })
    builder.addMatcher(rolesAPI.endpoints.getUserRoles.matchFulfilled, (state, action) => {
      state.boardCurrentUserRoles = action.payload
    })
    builder.addMatcher(rolesAPI.endpoints.addRole.matchFulfilled, () => {
      toast.success('Roles added successfully')
    })
  },
})

export default usersSlice.reducer
export const { setCurrentUserBan, setCurrentRole, pushToBoardCurrentUserRoles, removeRoleFromBoardAllRoles } =
  usersSlice.actions
