import { IUser } from '../types/User'
import { rtkAPI } from './rtkAPI'

export const usersAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], void>({
      query: () => ({
        url: `user/users`,
      }),
      providesTags: ['Users'],
    }),

    ban: build.mutation<IUser, { userId: number; banReason: string }>({
      query: ({ userId, banReason }) => ({
        url: '/user/ban',
        method: 'POST',
        body: { userId, banReason },
      }),
      invalidatesTags: ['Users'],
    }),

    getOne: build.query<IUser, number>({
      query: (userId) => ({
        url: `/user/getOneUser/${userId}`,
      }),
    }),
  }),
})

export const { useBanMutation, useGetAllUsersQuery, useGetOneQuery } = usersAPI
