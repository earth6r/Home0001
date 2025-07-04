/* eslint-disable no-console */
import React, { FC, useEffect, useState } from 'react'
import { initUserPayment } from '../actions'
import { animateScroll as scroll } from 'react-scroll'
import { FormProps } from '../types'
import WalletPayment from '../WalletPayment'
import BitPayment from '../BitPayment'
import { isMobile } from 'react-device-detect'

export const UserPaymentForm: FC<FormProps> = ({
  user,
  updateUser,
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

  const initPayment = async (type: 'Stripe' | 'Bitpay') => {
    if (!user?.email) {
      console.error('Missing required fields for user:', user)
      return
    }
    setIsSubmitting(true)

    initUserPayment(user.email, joiningFee as number, type, {
      signup_source: 'purchased',
    })
      .then(res => {
        if (!res?.success) {
          console.error('Error making payment:', res?.message)
          setFormError({
            error: true,
            message: `Payment failed: ${res?.message}`,
          })
          setFormSubmitted({ submitted: true, success: false })
          setIsSubmitting(false)
        } else {
          updateUser({
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

  useEffect(() => {
    scroll.scrollToBottom({ behavior: 'smooth' })
  }, [formError.error])

  return (
    <div className={className}>
      <div className="flex flex-col gap-y min-h-[calc(95svh-var(--header-height))]">
        {/* Payment method selector */}
        {!isMobile && (
          <div className="flex flex-col gap-y mb-y">
            <p className="!mx-0 !text-bodyLg !font-bold mb-y">
              Choose payment method:
            </p>

            <div className="flex flex-col gap-y">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={() => setPaymentMethod('stripe')}
                  className="mr-2"
                />
                <span className="font-medium uppercase">
                  Credit Card (Stripe)
                </span>
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
                <span className="font-medium uppercase">
                  Cryptocurrency (BitPay)
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Payment form based on selected method */}
        <div>
          {paymentMethod === 'stripe' ? (
            <WalletPayment
              user={user}
              updateUser={updateUser}
              joiningFee={joiningFee}
              cryptoPrice={cryptoPrice}
              onStripeSuccess={() => initPayment('Stripe')}
              className="flex flex-col h-full"
            />
          ) : (
            <BitPayment
              user={user}
              updateUser={updateUser}
              joiningFee={joiningFee}
              cryptoPrice={cryptoPrice}
              onPaymentSuccess={() => initPayment('Bitpay')}
              className="flex flex-col h-full"
            />
          )}
        </div>

        {formError.error && (
          <p className="text-[#FF0000] !mx-0 font-medium uppercase">
            {formError.message}
          </p>
        )}
      </div>
    </div>
  )
}
