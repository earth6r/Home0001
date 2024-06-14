/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface SetPasswordFormProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
  onPasswordSet: (password: string) => void
}

export const SetPasswordForm: FC<SetPasswordFormProps> = ({
  email,
  onPasswordSet,
  className,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState<{
    error: boolean | null
    message: string
  }>({ error: null, message: '' })

  const onSubmit = async (data: any) => {
    try {
      await axios.post(
        `${BASE_URL}/api/login/set-password`,
        { email: data.email, password: data.password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setFormSubmitted(true)
      onPasswordSet(data.password)
    } catch (error) {
      setFormError({
        error: true,
        message: (error as any).response.data.message as string,
      })
      // eslint-disable-next-line no-console
      console.error(error)
      // setFormSubmitted(true)
    }
  }

  return (
    <div className={classNames(className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <div
          className={classNames(className, 'w-full md:max-w-[526px] rich-text')}
        >
          <h2>{`Finish creating an account`}</h2>
          <p>{`0001 homes are released exclusively to our waitlist. Sign up here to continue:`}</p>

          <div className={classNames('relative flex flex-col gap-y')}>
            <div className="relative flex flex-col gap-y">
              <input
                placeholder={'YOUR EMAIL'}
                type="email"
                id="email"
                className="hidden"
                value={email}
                required
                {...register('email')}
              />

              <input
                placeholder={'PASSWORD'}
                type="password"
                id="password"
                className="input disabled:opacity-50"
                required
                {...register('password')}
              />

              <input
                placeholder={'RE-ENTER PASSWORD'}
                type="password"
                id="confirm_password"
                className="input disabled:opacity-50"
                required
                {...register('confirm_password', {
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Your passwords do no match'
                    }
                  },
                })}
              />
            </div>

            <p className="my-y">
              {`By creating an account you agree to HOME0001’s `}
              <Link href="./legal">{`Terms & Conditions`}</Link>
            </p>

            <div
              className={classNames('relative flex flex-col gap-2 md:gap-y')}
            >
              <button
                className="relative flex justify-between items-center w-full md:w-btnWidth px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
                type={'submit'}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Create account'}
                <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
              </button>
            </div>
          </div>
        </div>

        {formError.error !== null && (
          <p className="text-red mt-y font-medium uppercase">
            {formError.message || `Error setting password`}
          </p>
        )}

        {formSubmitted && (
          <div className="relative mt-ydouble mb-2">
            <p className="font-medium uppercase">{`Form submitted, please wait...`}</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default SetPasswordForm
