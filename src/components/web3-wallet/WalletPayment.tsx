/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useState, useEffect } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { setPaymentIntent } from './actions'
import { Web3UserProps } from '@contexts/web3'
import { loadStripe } from '@stripe/stripe-js'
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from '@stripe/react-stripe-js'

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY || 'pk_test_'
)

type PaymentContainerProps = {
  user?: Web3UserProps
  setUser: (arg0: any) => void
  email?: string
  onStripeSuccess?: () => void
}

interface WalletPaymentProps extends HTMLAttributes<HTMLFormElement> {
  user?: Web3UserProps
  setUser: (arg0: any) => void
  email?: string
  onStripeSuccess?: () => void
}

const STRIPE_PRODUCT_ID = 'prod_SEPtONnJGxLspP'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const PRODUCT_AMOUNT = 5000

const PaymentContainer: FC<PaymentContainerProps> = ({
  user,
  setUser,
  onStripeSuccess,
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
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState({
    submitted: false,
    success: false,
  })

  const stripe = useStripe()
  const elements = useElements()

  const initPayment = async () => {
    if (!stripe || !elements) {
      console.error('Missing required fields')
      setIsSubmitting(false)
      return
    }

    // send init webhook and send email on submit to backend
    const paymentEl = elements.getElement(PaymentElement)
    if (!paymentEl || !clientSecret) return

    const result = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: { return_url: BASE_URL + '?deposit=success' },
      redirect: 'if_required',
    })

    if (result.error) {
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
    setIsSubmitting(false)
  }

  const onSubmit = async (data: any) => {
    if (!data.email || !user?.address) {
      console.error('Missing required fields')
      return
    }
    setIsSubmitting(true)

    if (!stripe || !elements) {
      console.error('Missing required stripe fields')
      setIsSubmitting(false)
      return
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()
    if (submitError) {
      console.log(submitError)
      setIsSubmitting(false)
      return
    }

    setPaymentIntent(data.email, PRODUCT_AMOUNT, STRIPE_PRODUCT_ID)
      .then(async res => {
        setUser({
          ...user,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone,
          comms: data.comms,
          signup_source: 'purchased',
        })
        setClientSecret(res?.data.clientSecret)
      })
      .catch(err => {
        console.log(err)
        setIsSubmitting(false)
      })
  }

  useEffect(() => {
    if (clientSecret) {
      initPayment()
    }
  }, [clientSecret])

  return (
    <>
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
                className="relative flex justify-between items-center w-full md:w-btnWidth max-w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
                type={'submit'}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
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
      </form>
    </>
  )
}

export const WalletPayment: FC<WalletPaymentProps> = ({
  user,
  setUser,
  onStripeSuccess,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <div className="w-full md:max-w-[526px] rich-text">
        <Elements
          stripe={stripePromise}
          options={{ mode: 'payment', amount: PRODUCT_AMOUNT, currency: 'usd' }}
        >
          <PaymentContainer
            user={user}
            setUser={setUser}
            onStripeSuccess={onStripeSuccess}
          />
        </Elements>
      </div>
    </div>
  )
}

export default WalletPayment
