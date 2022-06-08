import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import loginbg from '../assets/loginbg.jpg'
import useAuth from '../hooks/useAuth'

interface Inputs {
  email: string
  password: string
}

const login = () => {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      await signIn(data.email, data.password)
    } else {
      await signUp(data.email, data.password)
    }
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        // src="https://rb.gy/p2hphi"
        src={loginbg}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <div className="flex min-h-screen flex-col items-center justify-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative mt-24 ml-4 items-center space-y-8 rounded bg-black/75 md:left-10 md:top-6 md:max-w-md md:px-14 "
        >
          <h1 className="mt-4 py-2 px-4 text-3xl font-semibold text-white">
            Sign in
          </h1>
          <div className="space-y-4 px-4">
            <label htmlFor="" className="inline-block w-full">
              <input
                type="email"
                placeholder="Email"
                className="input"
                {...register('email', { required: 'This is required' })}
              />
              {errors.email && (
                <p className="text-red-600">Please enter a valid email</p>
              )}
            </label>
            <label htmlFor="" className="inline-block w-full">
              <input
                type="password"
                placeholder="Password"
                className="input"
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 6,
                    message: 'Minimum length is 6',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Maximum length is 30',
                  },
                })}
              />
              {errors.password && (
                  <p className="text-red-600 ">Please enter a valid password</p>
                ) && <p className="text-red-600">{errors.password.message}</p>}
            </label>
          </div>
          <div className="px-4 text-gray-500">
            New to Netflix?{'  '}
            <button
              type="submit"
              className="text-white hover:underline"
              onClick={() => setLogin(false)}
            >
              Sign Up here!
            </button>
          </div>
          <div className="pb-4 pr-2 pl-2">
            <button
              className="mt-4 w-full rounded bg-[#e50914] py-3 pb-4 pt-4 text-lg text-white"
              onClick={() => setLogin(true)}
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default login
