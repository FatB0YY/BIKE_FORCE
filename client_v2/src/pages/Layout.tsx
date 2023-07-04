import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Layout
