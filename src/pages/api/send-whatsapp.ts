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
  const authToken = process.env.NEXT_PUBLIC_WHATSAPP_TOKEN

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
        Authorization: `Bearer ${authToken}`,
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

    await axios.post(`https://us-central1-homeearthnet.cloudfunctions.net/initialMessage`, {
      to: recipientPhone,
      message: message,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Couldn't send message", error })
  }
  return res.status(200).json({ message: 'Message sent' })
}
