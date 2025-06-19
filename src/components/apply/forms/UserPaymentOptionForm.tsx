/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { initUserPayment } from '../actions'
import { useForm } from 'react-hook-form'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from '../types'
import FormPane from '../FormPane'

export const UserPaymentOptionForm: FC<FormProps> = ({
  user,
  updateUser,
  className,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState({ error: false, message: '' })
  const [formSubmitted, setFormSubmitted] = useState({
    submitted: false,
    success: false,
  })

  const onSubmit = async (data: any) => {
    if (!data.referredToken || !user?.email) {
      console.error('Missing required fields for user:', user)
      return
    }
    setIsSubmitting(true)

    initUserPayment(user.email, {
      referred_token: data.referredToken,
      signup_source: 'referred',
    }).then(res => {
      console.log('Referral code submitted:', res)
      if (!res?.success) {
        console.error('Error making referral payment:', res?.message)
        setFormError({ error: true, message: 'Referral code failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      } else {
        updateUser({
          ...user,
          step: 'location',
          referred_token: data.referredToken,
          signup_source: 'referred',
        })

        setFormSubmitted({ submitted: true, success: true })
        scroll.scrollToTop({ behavior: 'smooth' })
      }
    })
  }

  return (
    <FormPane
      id="payment-form"
      className={className}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-ydouble">
        <div>
          <h3>{`Were you referred by an existing member?`}</h3>
          <p className="!mx-0 mt-y">
            If you were please enter the referral they shared with you below.
            <br />
            Otherwise please press skip.
          </p>
        </div>

        <input
          type="text"
          id="referral"
          placeholder="Enter code"
          className="input"
          {...register('referredToken', { required: 'Code required' })}
        />

        <button
          onClick={() =>
            updateUser({ ...user, step: 'payment', signup_source: 'payment' })
          }
          className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] bg-white border-black"
        >
          <IconSmallArrow fill="black" width="15" height="11" />

          <span className="uppercase font-medium leading-none text-xs">
            {`Skip`}
          </span>
        </button>
      </div>
    </FormPane>
  )
}
