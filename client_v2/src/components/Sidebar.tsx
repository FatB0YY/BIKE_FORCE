import React from 'react'
import { FaProductHunt } from 'react-icons/fa'
import { BiCategoryAlt } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { MdAdminPanelSettings } from 'react-icons/md'
import { TbBrandStackshare } from 'react-icons/tb'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { selectCurrentUser } from '../redux/slices/AuthSlice'
import { useLogoutMutation } from '../service/AuthAPI'

const Sidebar = () => {
  const sidebar = [
    {
      name: 'Products',
      icon: <FaProductHunt className='w-6 h-6 fill-current' />,
      path: '/products',
    },
    {
      name: 'Brands',
      icon: <TbBrandStackshare className='w-6 h-6 fill-current' />,
      path: '/brands',
    },
    {
      name: 'Categories',
      icon: <BiCategoryAlt className='w-6 h-6 fill-current' />,
      path: '/categories',
    },
    {
      name: 'Users',
      icon: <FiUsers className='w-6 h-6 fill-current' />,
      path: '/users',
    },
    {
      name: 'Roles',
      icon: <MdAdminPanelSettings className='w-6 h-6 fill-current' />,
      path: '/roles',
    },
  ]

  const user = useAppSelector(selectCurrentUser)
  let navigate = useNavigate()
  const [logout, {}] = useLogoutMutation()

  const handleLogout = () => {
    logout()
      .unwrap()
      .catch((error) => {
        console.error(error)
        // Обработка ошибки
      })
    navigate('/')
  }

  return (
    <aside className='py-6 px-10 w-64 border-r border-gray-200 pb-0 flex flex-col justify-around max-h-[100vh]'>
      <ul className=''>
        {sidebar.map((item) => {
          return (
            <li
              key={item.name}
              className='mt-4 mb-4'
            >
              <NavLink
                to={item.path}
                className='flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group sidebar'
              >
                <span className='absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out sidebar__line'></span>
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
      <p className='text-gray-500'>
        Welcome <span className='text-indigo-600'>{user?.email}!</span>
        <button
          onClick={handleLogout}
          type='button'
          className='mt-1 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none '
        >
          Sign out
        </button>
      </p>
    </aside>
  )
}

export default Sidebar
