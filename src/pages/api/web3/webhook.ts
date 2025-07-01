/* eslint-disable no-console */
import { enableCors } from '@lib/next/cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveError } from '@lib/util/save-error'
import axios from 'axios'
import { setCorsHeaders } from '@lib/util/cors'

const HOMETRICS_API = 'https://hometrics0001.vercel.app/api'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  setCorsHeaders(req, res)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id, status, orderId, buyer } = req.body

  console.log('BitPay webhook received:', { id, status, orderId, buyer })

  try {
    // Handle payment confirmed
    if (status === 'paid' || status === 'confirmed') {
      // Extract user info from the orderId or buyer data
      const walletAddress = buyer?.address1 // We stored wallet address here
      const email = buyer?.email

      if (email && walletAddress) {
        // Make payment confirmation call to Hometrics API
        const paymentData = {
          email: email,
          signupSource: 'purchased',
          paymentMethod: 'Bitpay',
          paymentProvider: 'bitpay',
          invoiceId: id,
          orderId: orderId,
          walletAddress: walletAddress,
        }

        try {
          await axios.post(`${HOMETRICS_API}/users/make-payment`, paymentData, {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })

          console.log('Payment confirmed in Hometrics API for:', email)
        } catch (apiError) {
          console.error('Error updating Hometrics API:', apiError)
          // Continue processing webhook even if API call fails
        }
      }
    }

    // Always respond with 200 to acknowledge webhook receipt
    return res.status(200).json({ received: true, status: 'processed' })
  } catch (err: any) {
    console.error('BitPay webhook processing error:', err.message)
    saveError(
      {
        error: err,
        additionalInfo: { id, status, orderId, buyer },
      },
      'bitPayWebhook'
    )

    // Still return 200 to prevent BitPay from retrying
    return res.status(200).json({ received: true, status: 'error' })
  }
}

export default enableCors(handler)
