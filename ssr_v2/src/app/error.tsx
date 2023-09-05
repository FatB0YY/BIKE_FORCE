'use client'

import { useEffect } from 'react'

const error = ({ error, reset }: any) => {
  useEffect(() => {
    // log the error
    console.log('error:', error)
  }, [error])

  return (
    <div>
      <div className='text-red-300'>Oops!!! {error.message}</div> <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default error
