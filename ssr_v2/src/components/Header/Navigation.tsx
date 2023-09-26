'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const Navigation = () => {
  const session = useSession()

  // const updateSession = async () => {
  //   await session.update({
  //     ...session,
  //     user: {
  //       ...session.data?.user,
  //       accessToken: 'rfrf',
  //       refreshToken: 'frf',
  //     },
  //   })
  // }

  return (
    <div>
      {session?.data && (
        <Link
          className='cursor-pointer bg-secondary hover:bg-[#f9e3da] font-bold py-2 px-4 rounded focus:outline-none'
          href='/profile'
        >
          Profile
        </Link>
      )}
      {session?.data ? (
        <button
          className='cursor-pointer bg-secondary hover:bg-[#f9e3da] font-bold py-2 px-4 rounded focus:outline-none'
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Sign Out
        </button>
      ) : (
        <>
          <Link
            className='cursor-pointer bg-secondary hover:bg-[#f9e3da] font-bold py-2 px-4 rounded focus:outline-none'
            href='/api/auth/signin'
          >
            Sign In
          </Link>
          <Link
            className='ml-2 cursor-pointer bg-secondary hover:bg-[#f9e3da] font-bold py-2 px-4 rounded focus:outline-none'
            href='/signup'
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  )
}

export default Navigation
