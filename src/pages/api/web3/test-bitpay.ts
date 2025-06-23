/* eslint-disable no-console */
import { enableCors } from '@lib/next/cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveError } from '@lib/util/save-error'
import axios from 'axios'
import { setCorsHeaders } from '@lib/util/cors'

const BITPAY_API_URL = 'https://bitpay.com/api'
const BITPAY_TOKEN = process.env.BITPAY_API_TOKEN

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  setCorsHeaders(req, res)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Simple BitPay invoice test with minimal required fields
    const invoiceData = {
      price: 50,
      currency: 'USD',
      orderId: `TEST-${Date.now()}`,
      itemDesc: 'Test Invoice',
      buyer: {
        email: 'test@example.com',
      },
      // Include token in request body
      token: BITPAY_TOKEN,
    }

    console.log('Testing BitPay API with minimal data:', invoiceData)

    // Test different authentication methods
    const authMethods = [
      {
        name: 'Bearer Token',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BITPAY_TOKEN}`,
        },
      },
      {
        name: 'Basic Auth',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(BITPAY_TOKEN + ':').toString(
            'base64'
          )}`,
        },
      },
      {
        name: 'Token in body only',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ]

    for (const authMethod of authMethods) {
      try {
        console.log(`Trying ${authMethod.name}...`)

        const response = await axios.post(
          `${BITPAY_API_URL}/invoices`,
          invoiceData,
          {
            headers: authMethod.headers,
            timeout: 10000,
          }
        )

        console.log(`${authMethod.name} SUCCESS:`, response.data)

        return res.status(200).json({
          success: true,
          method: authMethod.name,
          response: response.data,
        })
      } catch (error: any) {
        console.log(`${authMethod.name} FAILED:`, {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        })
      }
    }

    return res.status(400).json({
      success: false,
      error: 'All authentication methods failed',
      token_length: BITPAY_TOKEN?.length || 0,
      token_preview: BITPAY_TOKEN?.substring(0, 10) + '...',
    })
  } catch (err: any) {
    console.error('BitPay test error:', err.message)

    saveError(
      {
        error: err,
        additionalInfo: { endpoint: 'test-bitpay' },
      },
      'testBitPay'
    )

    return res.status(400).json({
      success: false,
      error: err.message,
    })
  }
}

export default enableCors(handler)
