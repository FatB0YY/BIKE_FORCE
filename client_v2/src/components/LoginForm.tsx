import React, { useEffect } from 'react'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { useAppSelector } from '../hooks/redux'
import { selectCurrentUser } from '../redux/slices/AuthSlice'
import { useLoginMutation } from '../service/AuthAPI'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface MyForm {
  email: string
  password: string
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading: isLoadingA },
    clearErrors,
    reset,
  } = useForm<MyForm>()

  const user = useAppSelector(selectCurrentUser)
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation()
  const navigate = useNavigate()
  let location = useLocation()

  let from = location.state?.from?.pathname || '/'

  const onValidSubmit: SubmitHandler<MyForm> = async ({ email, password }) => {
    email = email.toLocaleLowerCase()

    await login({ email, password })
      .unwrap()
      .then(() => {
        toast.success('Вход успешно выполнен')
        navigate(from, { replace: true })
      })
      .catch((error) => {
        console.error(error)
        // Обработка ошибки
      })

    clearErrors()
    reset()
  }

  const onInValidSubmit: SubmitErrorHandler<MyForm> = (data) => {
    console.log('data', data)
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/
    const maxLength = 200
    return emailRegex.test(email) && email.length <= maxLength
  }

  const isValidPassword = (password: string) => {
    const passwordRegex = /^.{8,200}$/
    return passwordRegex.test(password)
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  return (
    <section className='bg-gray-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>Sign in</h1>
            <form
              onSubmit={handleSubmit(onValidSubmit, onInValidSubmit)}
              className='space-y-4 md:space-y-6'
            >
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Your email
                </label>
                <input
                  {...register('email', { required: 'Invalid value', validate: isValidEmail })}
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 '
                  placeholder='name@company.com'
                />
                {errors.email && (
                  <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
                    <span className='font-medium'>Oops!</span> {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Password
                </label>
                <input
                  {...register('password', { required: 'Invalid value', validate: isValidPassword })}
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 '
                />
                {errors.password && (
                  <p className='mb-[15px] mt-2 text-sm text-red-600 dark:text-red-500'>
                    <span className='font-medium'>Oops!</span> {errors.password.message}
                  </p>
                )}
              </div>

              <button
                disabled={isLoadingLogin}
                type='submit'
                className='w-full bg-indigo-600 hover:bg-indigo-700 transition-transform  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
              >
                {isLoadingLogin ? 'Loading...' : 'Sign in'}
              </button>
              <p className='text-sm font-light text-gray-500 '>
                Don’t have an account yet?{' '}
                <Link
                  to='/signup'
                  className='font-medium text-primary-600 hover:underline text-indigo-600 '
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
