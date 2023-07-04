import { IRole } from '../types/Role'
import { IUser } from '../types/User'
import { rtkAPI } from './rtkAPI'

export const rolesAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllRoles: build.query<IRole[], void>({
      query: () => ({
        url: '/role',
      }),
      providesTags: ['Roles'],
    }),

    getRoleByName: build.query<IRole, string>({
      query: (value) => ({
        url: `/role/getOne?value=${value}`,
      }),
    }),

    getCurrentUserRoles: build.query<IRole[], number>({
      query: (userId) => ({
        url: `/role/getUserRoles?userId=${userId}`,
      }),
    }),

    getUserRoles: build.query<IRole[], number>({
      query: (userId) => ({
        url: `/role/getUserRoles?userId=${userId}`,
      }),
    }),

    addRole: build.mutation<IUser, { userId: number; roles: IRole[] }>({
      query: ({ userId, roles }) => ({
        url: `/role/addRole`,
        method: 'POST',
        body: { userId, roles },
      }),
    }),

    createRole: build.mutation<IRole, { value: string; description: string }>({
      query: ({ value, description }) => ({
        url: `/role`,
        method: 'POST',
        body: { value, description },
      }),
      invalidatesTags: ['Roles'],
    }),
  }),
})

export const {
  useGetAllRolesQuery,
  useAddRoleMutation,
  useCreateRoleMutation,
  useGetRoleByNameQuery,
  useLazyGetUserRolesQuery,
  useLazyGetCurrentUserRolesQuery,
} = rolesAPI
