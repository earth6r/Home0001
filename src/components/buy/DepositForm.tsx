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
import { loadStripe } from '@stripe/stripe-js'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

type PaymentContainerProps = {
  email?: string
  clientSecret?: string
}

interface DepositFormProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
  unit?: string
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY || 'pk_test_'
)

const PaymentContainer: FC<PaymentContainerProps> = ({ clientSecret }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    shouldUseNativeValidation: true,
  })
  const [formSubmitted, setFormSubmitted] = useState({
    submitted: false,
    success: false,
  })
  const [formError, setFormError] = useState({ error: false, message: '' })

  const stripe = useStripe()
  const elements = useElements()

  const onSubmit = async () => {
    // send init webhook and send email on submit to backend
    if (!stripe || !elements || !clientSecret) return

    const card = elements.getElement(CardElement)
    if (!card) return

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    })

    if (result.error) {
      // eslint-disable-next-line no-console
      console.log(result.error.message)
      setFormError({
        error: true,
        message: result.error.message || 'Payment error',
      })
      setFormSubmitted({ submitted: true, success: false })
    } else {
      console.log(result)
      setFormSubmitted({ submitted: true, success: true })
    }
  }

  return (
    <>
      {!formSubmitted.success && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
          <div className={classNames('relative flex flex-col gap-y')}>
            <div className="relative flex flex-col gap-y">
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

              <div
                className={classNames('relative flex flex-col gap-2 md:gap-y')}
              >
                <button
                  className="relative flex justify-between items-center w-full md:w-btnWidth px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
                  type={'submit'}
                  disabled={isSubmitting || !stripe}
                >
                  {isSubmitting ? 'Submitting...' : 'Make payment'}
                  <IconSmallArrow
                    className="w-[15px] md:w-[17px]"
                    height="10"
                  />
                </button>
              </div>
            </div>
          </div>

          {formError.error && (
            <p className="text-red mt-y font-medium uppercase">
              {formError.message || `Payment error`}
            </p>
          )}
        </form>
      )}

      {formSubmitted.submitted && formSubmitted.success && (
        <div className="relative mt-ydouble mb-2">
          <p className="font-medium uppercase">{`Payment successful`}</p>
        </div>
      )}
    </>
  )
}

export const DepositForm: FC<DepositFormProps> = ({
  email,
  unit,
  className,
}) => {
  const [clientSecret, setClientSecret] = useState(null)

  const setPaymentIntent = async () => {
    return await axios.post(
      `/api/create-stripe-payment`,
      { propertyType: unit },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  useEffect(() => {
    setPaymentIntent()
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }, [])

  return (
    <div className={classNames(className)}>
      <div
        className={classNames(className, 'w-full md:max-w-[526px] rich-text')}
      >
        <h2>{`Make deposit`}</h2>
        <p>{`We’ll send you a punch list and confirmation of your offer. In order to receive these documents including the offering plan you need to make a deposit of [TK].`}</p>

        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentContainer clientSecret={clientSecret} />
          </Elements>
        )}
      </div>
    </div>
  )
}

export default DepositForm
