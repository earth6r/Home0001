import type { NextApiRequest, NextApiResponse } from 'next'
import { BitPayClient } from '@/lib/bitpay/client'
import type {
  BitPayInvoiceData,
  BitPayInvoiceResponse,
} from '@/lib/bitpay/types'

interface CreateInvoiceRequest extends NextApiRequest {
  body: BitPayInvoiceData
}

export default async function handler(
  req: CreateInvoiceRequest,
  res: NextApiResponse<BitPayInvoiceResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const client = new BitPayClient()

    // TODO: MAKE SURE INVOICE DATA IS VALID AGAINST EXAMPLE https://developer.bitpay.com/reference/create-an-invoice
    console.log('Creating BitPay invoice with data:', req.body)
    const invoiceData = {
      notificationURL: `${
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      }/api/web3/webhook`,
      // redirectURL:
      //   req.body.redirectURL ||
      //   `${
      //     process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      //   }/payment/success`,
      itemizedDetails: {
        isFee: true,
      },
      ...req.body,
    }

    const invoice = await client.createInvoice(invoiceData)
    res.status(200).json(invoice)
  } catch (error) {
    console.error('BitPay invoice creation error:', error)
    res.status(500).json({ error: 'Failed to create invoice' })
  }
}
