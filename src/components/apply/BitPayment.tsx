/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react'
import React, { HTMLAttributes, useState, useEffect } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import IconSmallArrow from '@components/icons/IconSmallArrow'
import { createBitPayInvoice, checkBitPayInvoiceStatus } from './actions'
import { Web3UserProps } from '@contexts/web3'

interface BitPaymentProps extends HTMLAttributes<HTMLFormElement> {
  user?: Web3UserProps
  updateUser: (arg0: any) => void
  email?: string
  onPaymentSuccess?: () => void
  joiningFee?: number | null
  cryptoPrice?: number[]
}

const PaymentContainer: FC<BitPaymentProps> = ({
  user,
  updateUser,
  onPaymentSuccess,
  joiningFee,
  cryptoPrice,
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
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null)
  const [invoiceId, setInvoiceId] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<
    'pending' | 'paid' | 'expired' | null
  >(null)

  // Poll for payment status when invoice is created
  useEffect(() => {
    if (!invoiceId) return

    const pollInterval = setInterval(async () => {
      try {
        const statusResponse = await checkBitPayInvoiceStatus(invoiceId)

        if (statusResponse?.data?.success) {
          const status = statusResponse.data.invoice.status

          if (
            status === 'paid' ||
            status === 'confirmed' ||
            status === 'complete'
          ) {
            setPaymentStatus('paid')
            clearInterval(pollInterval)

            // Trigger success callback
            if (onPaymentSuccess) {
              onPaymentSuccess()
            }
          } else if (status === 'expired' || status === 'invalid') {
            setPaymentStatus('expired')
            clearInterval(pollInterval)
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error)
      }
    }, 5000) // Check every 5 seconds

    const timeout = setTimeout(() => {
      clearInterval(pollInterval)
      if (paymentStatus === 'pending') {
        setPaymentStatus('expired')
      }
    }, 5 * 60 * 1000)

    return () => {
      clearInterval(pollInterval)
      clearTimeout(timeout)
    }
  }, [invoiceId])

  const onSubmit = async () => {
    if (!user?.address || !user.email) {
      console.error('Missing required fields')
      return
    }
    setIsSubmitting(true)

    try {
      const invoiceData = {
        price: joiningFee || 50, // USD amount
        currency: 'USD', // Always USD, BitPay handles crypto conversion
        bitpayIdRequired: false,
        itemDesc: 'HOME0001 Application Fee',
        acceptanceWindow: 900000, // 15 minutes
        buyer: {
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
          email: user.email,
          address1: user.address, // Wallet address as identifier
        },
      }

      const response = await createBitPayInvoice(invoiceData)

      // Handle the updated API response structure
      if (response?.data?.data?.url) {
        setInvoiceUrl(response?.data.data.url)
        setInvoiceId(response?.data.data.id)
        setPaymentStatus('pending')

        // Open BitPay invoice in new window
        window.open(response.data.data.url, '_blank', 'width=800,height=600')
      } else {
        throw new Error(
          response?.data?.error || 'Failed to create BitPay invoice'
        )
      }
    } catch (error: any) {
      console.error('BitPay invoice creation error:', error)
      setFormError({
        error: true,
        message:
          error.response?.data?.error ||
          error.message ||
          'Error creating crypto payment',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y justify-between"
      >
        <div className="flex flex-col gap-y">
          <div>
            <p className="!mx-0 my-y !font-bold uppercase">
              Current joining fee:
            </p>
            <p>
              <span className="!font-bold">{`${joiningFee} USD`}</span>
              {cryptoPrice && cryptoPrice[0] > 0 && (
                <span className="!font-bold">{`/ ${cryptoPrice[1]} BTC / ${cryptoPrice[0]} ETH`}</span>
              )}
            </p>
          </div>

          {paymentStatus === 'pending' && (
            <div>
              <p className="font-medium">Payment window opened.</p>
              <p className="text-sm mt-1">
                Complete your payment in the new window. This page will
                automatically update when payment is confirmed.
              </p>
              {invoiceUrl && (
                <button
                  type="button"
                  onClick={() => window.open(invoiceUrl, '_blank')}
                  className="text-base font-medium underline mt-y"
                >
                  Reopen payment window.
                </button>
              )}
            </div>
          )}

          {paymentStatus === 'paid' && (
            <div>
              <p className="font-medium">Payment confirmed!</p>
              <p className="text-sm mt-1">
                Your crypto payment has been received and confirmed.
              </p>
            </div>
          )}

          {paymentStatus === 'expired' && (
            <div>
              <p className="font-medium">Payment expired</p>
              <p className="text-sm mt-1">
                The payment window has expired. Please create a new payment.
              </p>
            </div>
          )}
        </div>

        <div className={classNames('relative flex flex-col gap-y')}>
          {formError.error && (
            <p className="text-[#FF0000] font-medium uppercase">
              {formError.message || `Payment error`}
            </p>
          )}

          <p className="mt-y !mx-0 !mb-ydouble">{`Payment will take place in an external window.`}</p>

          <button
            className="flex items-center gap-[5px] w-fit py-[4px] px-[6px] mb-y bg-black text-white"
            type={'submit'}
            disabled={
              isSubmitting ||
              paymentStatus === 'pending' ||
              paymentStatus === 'paid'
            }
          >
            <IconSmallArrow fill="white" width="15" height="11" />
            <span className="uppercase font-medium leading-none text-xs">
              {paymentStatus === 'paid'
                ? 'Payment Confirmed'
                : paymentStatus === 'pending'
                ? 'Waiting for payment...'
                : isSubmitting
                ? 'Creating invoice...'
                : `Pay with wallet`}
            </span>
          </button>
        </div>
      </form>
    </>
  )
}

export const BitPayment: FC<BitPaymentProps> = ({
  user,
  updateUser,
  onPaymentSuccess,
  joiningFee,
  cryptoPrice,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <div className="w-full h-full rich-text">
        <PaymentContainer
          user={user}
          updateUser={updateUser}
          joiningFee={joiningFee}
          cryptoPrice={cryptoPrice}
          onPaymentSuccess={onPaymentSuccess}
        />
      </div>
    </div>
  )
}

export default BitPayment
