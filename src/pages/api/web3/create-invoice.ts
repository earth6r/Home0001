/* eslint-disable no-console */
import { enableCors } from '@lib/next/cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveError } from '@lib/util/save-error'
import axios from 'axios'

const BITPAY_API_URL = 'https://bitpay.com/api'
const BITPAY_TOKEN = process.env.BITPAY_API_TOKEN

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    amount,
    currency,
    buyerEmail,
    buyerName,
    orderId,
    itemDesc,
    notificationURL,
    acceptanceWindow,
    buyer,
  } = req.body

  if (!amount || !currency || !buyerEmail) {
    return res.status(400).json({
      error: 'Missing required invoice parameters',
    })
  }

  try {
    // BitPay invoice structure - using facade token approach
    const invoiceData = {
      price: parseFloat(amount),
      currency: currency,
      orderId: orderId || `ORDER-${Date.now()}`,
      itemDesc: itemDesc || 'Home0001 Application Payment',
      notificationURL:
        notificationURL ||
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bitpay/webhook`,
      redirectURL: `${process.env.NEXT_PUBLIC_BASE_URL}?payment=success`,
      acceptanceWindow: acceptanceWindow || 900000, // 15 minutes
      buyer: {
        name: buyerName || buyer?.name || '',
        email: buyerEmail,
        address1: buyer?.address1 || '',
        address2: buyer?.address2 || '',
        locality: buyer?.locality || '',
        region: buyer?.region || '',
        postalCode: buyer?.postalCode || '',
        country: buyer?.country || 'US',
        phone: buyer?.phone || '',
      },
      // BitPay token with facade
      token: {
        facade: 'merchant',
        value: BITPAY_TOKEN,
      },
      // BitPay specific fields
      fullNotifications: true,
      extendedNotifications: true,
      transactionSpeed: 'medium',
      // Specify supported payment methods
      paymentCurrencies: ['BTC', 'ETH'],
    }

    console.log('Creating BitPay invoice with data:', invoiceData)

    // Try BitPay's REST API endpoint
    const response = await axios.post(
      `${BITPAY_API_URL}/invoices`,
      invoiceData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Accept-Version': '2.0.0',
          Authorization: `Basic ${Buffer.from(BITPAY_TOKEN + ':').toString(
            'base64'
          )}`,
        },
        timeout: 30000, // 30 second timeout
      }
    )

    console.log('BitPay API Response Status:', response.status)
    console.log('BitPay API Response Data:', response.data)

    // BitPay returns data in different formats
    const invoice = response.data?.data || response.data

    if (!invoice || !invoice.id) {
      console.error('Invalid BitPay response structure:', response.data)
      throw new Error('Invalid response structure from BitPay API')
    }

    return res.status(200).json({
      success: true,
      invoice: {
        id: invoice.id,
        url: invoice.url,
        status: invoice.status,
        price: invoice.price,
        currency: invoice.currency,
        expirationTime: invoice.expirationTime,
        paymentUrls: invoice.paymentUrls,
        invoiceTime: invoice.invoiceTime,
      },
    })
  } catch (err: any) {
    console.error('BitPay invoice creation error:', {
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      message: err.message,
    })

    saveError(
      {
        error: err,
        additionalInfo: {
          amount,
          currency,
          buyerEmail,
          responseStatus: err.response?.status,
          responseData: err.response?.data,
        },
      },
      'createBitPayInvoice'
    )

    return res.status(400).json({
      status: 'error',
      message:
        err.response?.data?.error ||
        err.message ||
        'Failed to create BitPay invoice',
      details: err.response?.data || null,
    })
  }
}

export default enableCors(handler)
