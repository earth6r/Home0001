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
  setUser: (arg0: any) => void
  email?: string
  onPaymentSuccess?: () => void
  joiningFee?: number
  cryptoPrice?: number[]
}

const PaymentContainer: FC<BitPaymentProps> = ({
  user,
  setUser,
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
  const [selectedCrypto, setSelectedCrypto] = useState<'ETH' | 'BTC'>('ETH')
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

            // Update user context
            setUser({
              ...user,
              hasMadePayment: true,
              paymentType: 'crypto',
            })

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
    }, 1000) // Check every 5 seconds

    // Clean up interval after 30 minutes
    const timeout = setTimeout(() => {
      clearInterval(pollInterval)
      if (paymentStatus === 'pending') {
        setPaymentStatus('expired')
      }
    }, 30 * 60 * 1000)

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
        className="flex flex-col gap-y justify-between min-h-[calc(95svh-var(--header-height))]"
      >
        <div className="flex flex-col gap-y">
          <div>
            <h3>{`Pay with Crypto`}</h3>
            <p className="!mx-0 my-y">Current joining fee:</p>
            <p>
              {`${joiningFee} USD`}
              {cryptoPrice && cryptoPrice.length > 0 && (
                <span>{` / ${cryptoPrice[0]} ETH / ${cryptoPrice[1]} BTC`}</span>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-y">
            <p className="font-medium !m-0">
              Select your preferred cryptocurrency:
            </p>

            <div className="flex gap-yhalf">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="crypto"
                  value="ETH"
                  checked={selectedCrypto === 'ETH'}
                  onChange={() => setSelectedCrypto('ETH')}
                  className="mr-2"
                />
                <span className="font-medium">Ethereum (ETH)</span>
                {cryptoPrice && cryptoPrice[0] && (
                  <span className="ml-2 text-sm opacity-75">
                    (~{cryptoPrice[0]} ETH)
                  </span>
                )}
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="crypto"
                  value="BTC"
                  checked={selectedCrypto === 'BTC'}
                  onChange={() => setSelectedCrypto('BTC')}
                  className="mr-2"
                />
                <span className="font-medium">Bitcoin (BTC)</span>
                {cryptoPrice && cryptoPrice[1] && (
                  <span className="ml-2 text-sm opacity-75">
                    (~{cryptoPrice[1]} BTC)
                  </span>
                )}
              </label>
            </div>
          </div>

          {paymentStatus === 'pending' && (
            <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
              <p className="font-medium">Payment window opened!</p>
              <p className="text-sm mt-1">
                Complete your {selectedCrypto} payment in the new window. This
                page will automatically update when payment is confirmed.
              </p>
              {invoiceUrl && (
                <button
                  type="button"
                  onClick={() => window.open(invoiceUrl, '_blank')}
                  className="text-blue-600 underline text-sm mt-2"
                >
                  Reopen payment window
                </button>
              )}
            </div>
          )}

          {paymentStatus === 'paid' && (
            <div className="p-xhalf">
              <p className="font-medium">Payment confirmed!</p>
              <p className="text-sm mt-1">
                Your crypto payment has been received and confirmed.
              </p>
            </div>
          )}

          {paymentStatus === 'expired' && (
            <div className="p-xhalf">
              <p className="font-medium">Payment expired</p>
              <p className="text-sm mt-1">
                The payment window has expired. Please create a new payment.
              </p>
            </div>
          )}
        </div>

        <div className={classNames('relative flex flex-col gap-y')}>
          {formError.error && (
            <p className="text-red-600 font-medium uppercase">
              {formError.message || `Payment error`}
            </p>
          )}
          <button
            className="relative flex justify-between items-center w-full max-w-full px-x h-btn text-center uppercase text-white bg-black font-medium text-xs z-above"
            type={'submit'}
            disabled={
              isSubmitting ||
              paymentStatus === 'pending' ||
              paymentStatus === 'paid'
            }
          >
            {paymentStatus === 'paid'
              ? 'Payment Confirmed'
              : paymentStatus === 'pending'
              ? 'Waiting for payment...'
              : isSubmitting
              ? 'Creating invoice...'
              : `Pay with ${selectedCrypto}`}
            <IconSmallArrow className="w-[15px] md:w-[17px]" height="10" />
          </button>
        </div>
      </form>
    </>
  )
}

export const BitPayment: FC<BitPaymentProps> = ({
  user,
  setUser,
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
          setUser={setUser}
          joiningFee={joiningFee}
          cryptoPrice={cryptoPrice}
          onPaymentSuccess={onPaymentSuccess}
        />
      </div>
    </div>
  )
}

export default BitPayment
