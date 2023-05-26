import React from 'react'
import { FaProductHunt } from 'react-icons/fa'
import { BiCategoryAlt } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { MdAdminPanelSettings } from 'react-icons/md'
import { TbBrandStackshare } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import logo from './assets/image/logo.svg'

function App() {
  const sidebar = [
    {
      name: 'Products',
      icon: <FaProductHunt className='w-6 h-6 fill-current' />,
    },
    {
      name: 'Brands',
      icon: <TbBrandStackshare className='w-6 h-6 fill-current' />,
    },
    {
      name: 'Categories',
      icon: <BiCategoryAlt className='w-6 h-6 fill-current' />,
    },
    {
      name: 'Users',
      icon: <FiUsers className='w-6 h-6 fill-current' />,
    },
    {
      name: 'Roles',
      icon: <MdAdminPanelSettings className='w-6 h-6 fill-current' />,
    },
  ]

  const status = [
    { name: 'Hidden', icon: <AiFillDelete className='w-6 h-6 fill-current' /> },
    { name: 'Visible', icon: <AiFillEye className='w-6 h-6 fill-current' /> },
  ]

  const products = [
    {
      id: 1,
      name: 'Product1',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      CategoryId: 1,
      BrandId: 1,
      price: 100,
      isActive: true,
      createdAt: '24-04-2023',
    },
    {
      id: 2,
      name: 'Product2',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      CategoryId: 2,
      BrandId: 2,
      price: 200,
      isActive: true,
      createdAt: '24-04-2023',
    },
    {
      id: 3,
      name: 'Product3',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      CategoryId: 3,
      BrandId: 3,
      price: 300,
      isActive: false,
      createdAt: '24-04-2023',
    },
    {
      id: 4,
      name: 'Product4',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      CategoryId: 4,
      BrandId: 4,
      price: 400,
      isActive: true,
      createdAt: '24-04-2023',
    },
    {
      id: 5,
      name: 'Product5',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      CategoryId: 3,
      BrandId: 3,
      price: 500,
      isActive: false,
      createdAt: '24-04-2023',
    },
    {
      id: 6,
      name: 'Product6',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      CategoryId: 3,
      BrandId: 3,
      price: 600,
      isActive: false,
      createdAt: '24-04-2023',
    },
  ]

  return (
    <div className='w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex'>
      <aside className='py-6 px-10 w-64 border-r border-gray-200 '>
        <img
          src={logo}
          alt='ADMIN PANEL'
          className='w-[50px]'
        />

        <ul className='flex flex-col gay-y-6 pt-20'>
          {sidebar.map((item) => {
            return (
              <li
                key={item.name}
                className='mt-4 mb-4'
              >
                <a
                  href='/'
                  className='flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group '
                >
                  <span className='absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out'></span>
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </aside>
      <main className='flex-1'>
        <div className='flex items-center justify-between py-7 px-10'>
          <div>
            <h1 className='text-2xl font-semibold leading-relaxed text-gray-800'>Products</h1>
            <p className='text-sm font-medium text-gray-500'>Create your product and upload here</p>
          </div>

          <button className='inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1'>
            <AiOutlinePlus className='w-6 h-6 fill-current' />
            <span className='text-sm font-semibold tracking-wide'>Create item</span>
          </button>
        </div>

        <ul className='flex gap-x-24 items-center px-4 border-y border-gray-200'>
          {status.map((item) => {
            return (
              <li>
                <button className='flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group'>
                  {item.icon}
                  <span className='font-medium '>{item.name}</span>
                  <span className='absolute w-full h-0.5 left-4 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out'></span>
                </button>
              </li>
            )
          })}
        </ul>

        <table className='w-full '>
          <thead>
            <tr className='text-sm font-medium text-gray-700 border-b border-gray-200 '>
              <td className='pl-10'>Product name</td>
              <td className='py-4 px-4 text-center'>Price</td>
              <td className='py-4 px-4 text-center'>Category</td>
              <td className='py-4 px-4 text-center'>Brand</td>
              <td className='py-4 px-4 text-center'>isActive</td>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr
                  key={item.id}
                  className={
                    item.isActive ? 'hover:bg-gray-100 transition-transform' : 'bg-red-100 transition-transform'
                  }
                >
                  <td className='flex gap-x-4 items-center py-4 pl-10'>
                    <img
                      src={item.img}
                      alt={item.name}
                      className='w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200'
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className='font-medium text-center'>${item.price}</td>
                  <td className='font-medium text-center'>{item.CategoryId}</td>
                  <td className='font-medium text-center'>{item.BrandId}</td>
                  <td className='font-medium text-center'>{item.isActive ? '+' : '-'}</td>
                  <td className='font-medium text-center'>
                    <div className='flex w-20 items-center text-gray-500'>
                      {item.isActive ? (
                        <button className='p-2 hover:rounded-md hover:bg-gray-200'>
                          <AiFillDelete className='w-6 h-6 fill-current' />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default App
