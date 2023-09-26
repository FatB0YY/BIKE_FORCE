'use client'

import { useSession } from 'next-auth/react'

const LoadingLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()

  if (session.status === 'loading') {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-100 z-50'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#E4322C]'></div>
      </div>
    )
  }

  return <>{children}</>
}

export default LoadingLayout
