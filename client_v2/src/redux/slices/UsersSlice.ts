import { PayloadAction, createSlice } from '@reduxjs/toolkit'
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

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setCurrentUserBan: (state, action: PayloadAction<number | null>) => {
      state.currentUserBan = action.payload
    },

    setCurrentRole: (state, action: PayloadAction<IRole | null>) => {
      state.currentRole = action.payload
    },

    pushToBoardCurrentUserRoles: (state, action: PayloadAction<IRole>) => {
      state.boardCurrentUserRoles.push(action.payload)
    },

    removeRoleFromBoardAllRoles: (state, action: PayloadAction<IRole>) => {
      state.boardAllRoles = state.boardAllRoles.filter((role) => role.id !== action.payload.id)
    },
  },
  extraReducers: (builder) => {
    // Fulfilled
    builder.addMatcher(rolesAPI.endpoints.getAllRoles.matchFulfilled, (state, action: PayloadAction<any>) => {
      state.boardAllRoles = action.payload
    })
    builder.addMatcher(rolesAPI.endpoints.getUserRoles.matchFulfilled, (state, action: PayloadAction<any>) => {
      state.boardCurrentUserRoles = action.payload
    })
    builder.addMatcher(rolesAPI.endpoints.addRole.matchFulfilled, () => {
      toast.success('Roles added successfully')
    })
  },
})

export const { reducer: usersReducer, actions: usersActions } = usersSlice
