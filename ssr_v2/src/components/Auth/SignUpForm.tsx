'use client'
import UserService from '@/services/UserService'
import { displayErrors } from '@/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, type FormEventHandler } from 'react'
import { toast } from 'react-toastify'

const SignUpForm = () => {
  const session = useSession()
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      displayErrors({ message: 'Неверные данные!' })
      return null
    }

    const role = await UserService.getOneRole('USER')

    if (role.value === 'USER') {
      const authResponse: any = await UserService.registration(email, password, [role])

      if (authResponse.errors) {
        if (authResponse.errors.length > 0 && authResponse.message) {
          displayErrors(authResponse)
          return null
        }
      }

      toast.success('Пользователь успешно создан!')
      return null
    } else {
      displayErrors({ message: 'Ошибка роли' })
      return null
    }
  }

  // useEffect(() => {
  //   if (session.data && session.status === 'authenticated') {
  //     router.push('/profile')
  //   }
  // })

  return (
    <div className='min-h-screen flex items-center justify-center bg-F5E6E0'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h2 className='text-2xl font-semibold mb-4'>SignUp</h2>
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
              Создать аккаунт
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpForm
