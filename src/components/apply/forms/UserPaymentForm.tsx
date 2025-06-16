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
            paymentType: 'bitpay',
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
      <div className="flex flex-col gap-ydouble">
        <BitPayment
          user={user}
          setUser={setUser}
          joiningFee={joiningFee}
          cryptoPrice={cryptoPrice}
          onPaymentSuccess={initPayment}
          className="flex flex-col h-full"
        />
      </div>

      {formError.error && (
        <p className="text-red mt-y font-medium uppercase">
          {formError.message}
        </p>
      )}
    </div>
  )
}
