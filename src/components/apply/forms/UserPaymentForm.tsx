/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { initUserPayment } from '../actions'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from '../types'
import WalletPayment from '../WalletPayment'
import BitPayment from '../BitPayment'
import classNames from 'classnames'

export const UserPaymentForm: FC<FormProps> = ({
  user,
  setUser,
  joiningFee,
  cryptoPrice,
  className,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState({ error: false, message: '' })
  const [formSubmitted, setFormSubmitted] = useState({
    submitted: false,
    success: false,
  })
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'bitpay'>(
    'stripe'
  )

  const initPayment = async () => {
    if (!user?.email) {
      console.error('Missing required fields for user:', user)
      return
    }
    setIsSubmitting(true)

    initUserPayment(user.email, {
      signup_source: 'purchased',
    })
      .then(res => {
        console.log('Payment submitted:', res)
        if (!res?.success) {
          console.error('Error making payment:', res?.message)
          setFormError({ error: true, message: 'Payment failed' })
          setFormSubmitted({ submitted: true, success: false })
          setIsSubmitting(false)
        } else {
          setUser({
            ...user,
            step: 'location',
            hasMadePayment: true,
            paymentType: paymentMethod,
          })

          setFormSubmitted({ submitted: true, success: true })
          scroll.scrollToTop({ behavior: 'smooth' })
        }
      })
      .catch(err => {
        console.error('Payment error:', err)
        setFormError({ error: true, message: 'Payment failed' })
        setFormSubmitted({ submitted: true, success: false })
        setIsSubmitting(false)
      })
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-ydouble min-h-[calc(95svh-var(--header-height))]">
        {/* Payment method selector */}
        <div className="flex flex-col gap-y">
          <h3>Choose your payment method:</h3>

          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === 'stripe'}
                onChange={() => setPaymentMethod('stripe')}
                className="mr-2"
              />
              <span className="font-medium">Credit Card (Stripe)</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="bitpay"
                checked={paymentMethod === 'bitpay'}
                onChange={() => setPaymentMethod('bitpay')}
                className="mr-2"
              />
              <span className="font-medium">Cryptocurrency (BitPay)</span>
            </label>
          </div>
        </div>

        {/* Payment form based on selected method */}
        <div>
          {paymentMethod === 'stripe' ? (
            <WalletPayment
              user={user}
              setUser={setUser}
              joiningFee={joiningFee}
              cryptoPrice={cryptoPrice}
              onStripeSuccess={initPayment}
              className="flex flex-col h-full"
            />
          ) : (
            <BitPayment
              user={user}
              setUser={setUser}
              joiningFee={joiningFee}
              cryptoPrice={cryptoPrice}
              onPaymentSuccess={initPayment}
              className="flex flex-col h-full"
            />
          )}
        </div>
      </div>

      {formError.error && (
        <p className="text-red mt-y font-medium uppercase">
          {formError.message}
        </p>
      )}
    </div>
  )
}
