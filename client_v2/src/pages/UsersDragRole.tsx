import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOneQuery } from '../service/UsersAPI'
import { useAddRoleMutation, useGetAllRolesQuery, useLazyGetUserRolesQuery } from '../service/RolesAPI'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IRole } from '../types/Role'
import { pushToBoardCurrentUserRoles, removeRoleFromBoardAllRoles, setCurrentRole } from '../redux/slices/UsersSlice'

const UsersDragRole = () => {
  // dispatch
  const dispatch = useAppDispatch()
  // react router dom
  const { userId } = useParams()
  // rtk query
  const { data: user, isLoading: isLoadingGetOne } = useGetOneQuery(Number(userId))
  const { isLoading: isLoadingGetAllRoles } = useGetAllRolesQuery()
  const [lazyGetUserRoles, { isLoading: isLoadingLazyGetUserRoles }] = useLazyGetUserRolesQuery()
  const [addRole, { isLoading: isLoadingAddRole }] = useAddRoleMutation()
  // redux state
  const { boardAllRoles, boardCurrentUserRoles, currentRole } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (user && userId) {
      lazyGetUserRoles(Number(userId))
    }
  }, [user, userId])

  if (isLoadingGetOne || isLoadingGetAllRoles || isLoadingLazyGetUserRoles) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>No user</div>
  }

  function dragOverHandler(event: any): void {
    event.preventDefault()
  }
  function dragLeaveHandler(event: any): void {}

  function dragStartHandler(event: any, item: any): void {
    dispatch(setCurrentRole(item))
  }

  function dragEndHandler(event: any): void {
    dispatch(setCurrentRole(null))
  }

  function dropHandler(event: any): void {
    event.stopPropagation()
  }

  function dropCardHandler(event: any) {
    event.preventDefault()
    event.stopPropagation()

    dispatch(pushToBoardCurrentUserRoles(currentRole))
    dispatch(removeRoleFromBoardAllRoles(currentRole))
  }

  const handleSave = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()

    const newRoles = boardCurrentUserRoles.filter((item) => {
      return !boardAllRoles.some((element) => element.id === item.id)
    })

    await addRole({ userId: Number(userId), roles: newRoles })
  }

  return (
    <main className='min-h-screen w-screen bg-gray-200 flex items-center justify-around'>
      <div className='min-h-[500px] w-full max-w-sm border-2 rounded-lg border-gray-300 p-3'>
        <p className='ml-2 mb-2 text-gray-700 font-semibold font-sans tracking-wide'>All roles</p>
        {boardAllRoles.length > 0 &&
          boardAllRoles.map((item) => {
            if (!boardCurrentUserRoles.some((role: IRole) => role.id === item.id)) {
              return (
                <div
                  draggable
                  // когда находимся над другим объектом
                  // onDragOver={(event) => dragOverHandler(event)}
                  // когда мы вышли за пределы другой карточки
                  onDragLeave={(event) => dragLeaveHandler(event)}
                  // когда взяли карточку
                  onDragStart={(event) => dragStartHandler(event, item)}
                  // когда отпустили карточку
                  onDragEnd={(event) => dragEndHandler(event)}
                  // отпустили карточку и рассчитываем на действие
                  // onDrop={(event) => dropHandler(event)}
                  key={item.id}
                  className='item p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move'
                >
                  {item.value}
                </div>
              )
            } else {
              return (
                <div
                  draggable={false}
                  key={item.id}
                  className='item p-4 mb-3 flex justify-between items-center bg-red-100 shadow rounded-lg cursor-not-allowed'
                >
                  {item.value}
                </div>
              )
            }
          })}
      </div>
      <button
        disabled={isLoadingAddRole}
        onClick={handleSave}
        type='button'
        className='mt-1 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none '
      >
        {isLoadingAddRole ? 'Loading...' : 'Save changes'}
      </button>
      <div
        className='min-h-[500px] w-full max-w-sm border-2 rounded-lg border-gray-300 p-3'
        onDragOver={(event) => dragOverHandler(event)}
        onDrop={(event) => dropCardHandler(event)}
      >
        <p className='ml-2 mb-2 text-gray-700 font-semibold font-sans tracking-wide'>{user.email} roles</p>
        {boardCurrentUserRoles.length > 0 &&
          boardCurrentUserRoles.map((item) => (
            <div
              key={item.id}
              className='item p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg'
            >
              {item.value}
            </div>
          ))}
      </div>
    </main>
  )
}

export default UsersDragRole
