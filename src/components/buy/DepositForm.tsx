/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from '@stripe/react-stripe-js'
import { Token, loadStripe } from '@stripe/stripe-js'

type StripeElementProps = {
  email?: string
}

interface DepositFormProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY || 'pk_test_'
)

const StripeElement: FC<StripeElementProps> = ({ email }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState({ error: false, message: '' })

  const stripe = useStripe()
  const elements = useElements()

  const stripeTokenHandler = async (token: Token) => {
    const paymentData = { token: token.id }

    const res = await axios.post('/charge', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    console.log('stripeTokenHandler: ', res)

    return res
  }

  const onSubmit = async (data: any) => {
    if (!stripe || !elements) return

    const card = elements.getElement(CardElement)
    if (!card) return
    const res = await stripe.createToken(card)

    if (res.error) {
      setFormError({ error: true, message: res.error.message || '' })
    } else {
      stripeTokenHandler(res.token)
      setFormSubmitted(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
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

          <div className="input grid items-center w-full">
            <CardElement
              options={{
                style: {
                  base: {
                    color: '#000',
                    fontFamily: '"Has Grot", Arial, sans-serif',
                    fontSize: '16px',
                    '::placeholder': {
                      color: '#E9E9E9',
                    },
                  },
                  invalid: {
                    color: '#000',
                    iconColor: '#000',
                  },
                },
              }}
            />
          </div>

          <div className={classNames('relative flex flex-col gap-2 md:gap-y')}>
            <button
              className="relative flex justify-between items-center w-full md:w-btnWidth px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
              type={'submit'}
              disabled={isSubmitting || !stripe}
            >
              {isSubmitting ? 'Submitting...' : 'Make payment'}
              <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
            </button>
          </div>
        </div>
      </div>

      {formError.error && (
        <p className="text-red mt-y font-medium uppercase">
          {formError.message || `Payment error`}
        </p>
      )}

      {formSubmitted && (
        <div className="relative mt-ydouble mb-2">
          <p className="font-medium uppercase">{`Form submitted, please wait...`}</p>
        </div>
      )}
    </form>
  )
}

export const DepositForm: FC<DepositFormProps> = ({ email, className }) => {
  // useEffect(() => {
  //   const fetchClientSecret = async () => {
  //     const response = await axios.post('/api/stripe-webhook')
  //     console.log(response)
  //     setClientSecret(response.data.clientSecret)
  //   }
  //   fetchClientSecret()
  // }, [])

  return (
    <div className={classNames(className)}>
      <div
        className={classNames(className, 'w-full md:max-w-[526px] rich-text')}
      >
        <h2>{`Make deposit`}</h2>
        <p>{`We’ll send you a punch list and confirmation of your offer. In order to receive these documents including the offering plan you need to make a deposit of [TK].`}</p>

        <Elements stripe={stripePromise}>
          <StripeElement email={email} />
        </Elements>
      </div>
    </div>
  )
}

export default DepositForm
