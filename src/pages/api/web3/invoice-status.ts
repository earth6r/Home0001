/* eslint-disable no-console */
import { enableCors } from '@lib/next/cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveError } from '@lib/util/save-error'
import axios from 'axios'

const BITPAY_API_TEST_URL = 'https://test.bitpay.com'
const BITPAY_API_URL = 'https://bitpay.com'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const prod = BASE_URL == 'https://home0001.com'
  const { invoiceId } = req.query

  if (!invoiceId) {
    return res.status(400).json({
      error: 'Missing invoice ID',
    })
  }

  try {
    const response = await axios.get(
      `${prod ? BITPAY_API_URL : BITPAY_API_TEST_URL}/invoices/${invoiceId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Accept-Version': '2.0.0',
          accept: 'application/json',
        },
        timeout: 10000,
      }
    )

    const invoice = response.data?.data || response.data

    return res.status(200).json({
      success: true,
      invoice: {
        id: invoice.id,
        status: invoice.status,
        price: invoice.price,
        currency: invoice.currency,
        expirationTime: invoice.expirationTime,
        currentTime: invoice.currentTime,
        transactions: invoice.transactions,
      },
    })
  } catch (err: any) {
    console.error(
      'BitPay status check error:',
      err.response?.data || err.message
    )

    saveError(
      {
        error: err,
        additionalInfo: { invoiceId },
      },
      'checkBitPayInvoiceStatus'
    )

    return res.status(400).json({
      success: false,
      error:
        err.response?.data?.error ||
        err.message ||
        'Failed to check invoice status',
    })
  }
}

export default enableCors(handler)
