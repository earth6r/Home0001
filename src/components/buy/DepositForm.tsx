/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { setPaymentIntent } from './actions'

type PaymentContainerProps = {
  email?: string
  unit?: string
  onStripeSuccess?: () => void
}

interface DepositFormProps extends HTMLAttributes<HTMLFormElement> {
  email?: string
  unit?: string
  onStripeSuccess?: () => void
}

const DEPOSIT_AMOUNT = 1000

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY || 'pk_test_'
)

const PaymentContainer: FC<PaymentContainerProps> = ({
  email,
  unit,
  onStripeSuccess,
}) => {
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
  const [clientSecret, setClientSecret] = useState(null)

  const stripe = useStripe()
  const elements = useElements()

  const initPayment = async () => {
    if (!stripe || !elements) return
    console.log('initPayment')

    // send init webhook and send email on submit to backend
    const paymentEl = elements.getElement(PaymentElement)
    if (!paymentEl || !clientSecret) return

    const result = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: { return_url: '#paid' },
      redirect: 'if_required',
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
      setFormSubmitted({ submitted: true, success: true })
      onStripeSuccess && onStripeSuccess()
    }
  }

  const onSubmit = async () => {
    console.log('onSubmit')
    if (!unit || !email || !elements) return

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()
    if (submitError) {
      console.log(submitError)
      return
    }

    console.log('setPaymentIntent')
    setPaymentIntent(email, unit)
      .then(res => {
        setClientSecret(res.data.clientSecret)
        initPayment()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      {!formSubmitted.success && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
          <div className={classNames('relative flex flex-col gap-y')}>
            <div className="relative flex flex-col gap-y">
              <div className="grid items-center w-full">
                <PaymentElement />
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
  onStripeSuccess,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <div
        className={classNames(className, 'w-full md:max-w-[526px] rich-text')}
      >
        <h2>{`Make deposit`}</h2>
        <p>{`We’ll send you a punch list and confirmation of your offer. In order to receive these documents including the offering plan you need to make a deposit of $${DEPOSIT_AMOUNT}.`}</p>

        <Elements
          stripe={stripePromise}
          options={{ mode: 'payment', amount: DEPOSIT_AMOUNT, currency: 'usd' }}
        >
          <PaymentContainer
            email={email}
            unit={unit}
            onStripeSuccess={onStripeSuccess}
          />
        </Elements>
      </div>
    </div>
  )
}

export default DepositForm
