import type { FC } from 'react'
import React, { HTMLAttributes, useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

interface DepositFormProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY || 'pk_test_'
)
const stripeOptions = {
  clientSecret: process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET_KEY,
}

export const DepositForm: FC<DepositFormProps> = ({ email, className }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState<unknown | string | null>(null)

  const onSubmit = async (data: any) => {
    try {
      await axios.post(
        `/api/login/set-password`,
        { email: data.email, password: data.password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setFormSubmitted(true)
    } catch (error) {
      setFormError(error)
      // eslint-disable-next-line no-console
      console.error(error)
      setFormError(true)
      // setFormSubmitted(true)
    }
  }

  return (
    <div className={classNames(className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <div
          className={classNames(className, 'w-full md:max-w-[526px] rich-text')}
        >
          <h2>{`Make deposit`}</h2>
          <p>{`We’ll send you a punch list and confirmation of your offer. In order to receive these documents including the offering plan you need to make a deposit of [TK].`}</p>

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

              {/* <Elements stripe={stripePromise} options={stripeOptions}>
                <form>
                  <PaymentElement />
                  

            <div
              className={classNames('relative flex flex-col gap-2 md:gap-y')}
            >
              <button
                className="relative flex justify-between items-center w-full md:w-btnWidth px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
                type={'submit'}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Make payment'}
                <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
              </button>
            </div>
                </form>
              </Elements> */}
            </div>
          </div>
        </div>

        {formError !== null && (
          <p className="text-red mt-y font-medium uppercase">{`Error setting password`}</p>
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

export default DepositForm
