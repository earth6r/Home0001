import type { NextApiRequest, NextApiResponse } from 'next'

const axios = require('axios')

type Data = {
  message: string
  error?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { recipientPhone, message } = req.body

  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipientPhone,
    type: 'text',
    text: {
      preview_url: false,
      body: message,
    },
  }

  try {
    const config = {
      headers: {
        Authorization:
          'Bearer EAAZAhUvSBby8BO5r6SZBKl4snJ6ypYczZBFCLArQBqGS0NoZBFIq3gTCiVnl6tDQzPa0QkpQqsvPBnHHx2CfiJoiytzhgl3f7UaOS24fxIZB52LBPKut5prXeCZBrZBtdLIVqWGNxPeX2tC5l560Eop8TN1rmpsR5iTOnSJNCCDM9IgS1Yi2epVZCGv1Y6PCd5Jd5smB4oqgaZBleDUw3uokZD',
        'Content-Type': 'application/json',
      },
    }

    axios
      .post(
        'https://graph.facebook.com/v18.0/307932205726236/messages',
        data,
        config
      )
      .then((response: { data: any }) => {
        console.log(response.data)
      })
      .catch((error: any) => {
        console.error(error)
      })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Couldn't send message", error })
  }
  return res.status(200).json({ message: 'Message sent' })
}
