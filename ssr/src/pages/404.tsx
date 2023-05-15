import React from 'react'
import notFoundImage from '../img/notFoundImage.png'
import Link from 'next/link'
import MainLayout from '@/components/MainLayout'
import { NextPage } from 'next'
import Image from 'next/image'

const NotFoundPage: NextPage = () => {
  return (
    <MainLayout title='Oops... Page Not Found'>
      <section
        className='h-screen overflow-hidden flex items-center justify-center'
        style={{ background: '#edf2f7' }}
      >
        <div className='h-screen w-screen bg-gray-100 flex items-center'>
          <div className='container flex flex-col md:flex-row items-center mx-auto justify-center px-5 text-gray-700'>
            <div className='max-w-md'>
              <div className='text-5xl font-bold'>404</div>
              <p className='text-2xl md:text-3xl font-light leading-normal'>Sorry we couldn't find this page.</p>
              <p className='mb-8'>But dont worry, you can find plenty of other things on our homepage.</p>

              <Link
                href='/'
                className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700'
              >
                back to homepage
              </Link>
            </div>
            <div className='max-w-lg'>
              <Image
                src={notFoundImage.src}
                alt='Page Not Found'
                width={500}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default NotFoundPage
