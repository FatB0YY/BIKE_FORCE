'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import type { FormEventHandler } from 'react'
import { displayErrors } from '@/utils/index'

const SignInForm = () => {
  const router = useRouter()
  const session = useSession()

  console.log('session', session)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })
      .then(async (signInResponse) => {
        console.log('signInResponse', signInResponse)

        if (signInResponse) {
          if (!signInResponse.error) {
            router.push('/profile')
          }

          if (signInResponse.error) {
            displayErrors(JSON.parse(signInResponse.error))
            return null
          }
        }

        return null
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (session.data?.user && session.status === 'authenticated') {
      router.push('/profile')
    }
  })

  return (
    <div className='min-h-screen flex items-center justify-center bg-F5E6E0'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-semibold mb-4'>SignIn</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-secondary'
              placeholder='example@example.com'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Пароль
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-secondary'
              placeholder='********'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-secondary hover:bg-[#f9e3da] text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue'
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInForm
