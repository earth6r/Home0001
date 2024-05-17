import type { NextApiRequest, NextApiResponse } from 'next'

const axios = require('axios')

type Data = {
  message: string
  error?: unknown
}
const getWhatsAppBusinessDetails = async (accessToken: string) => {
  return axios.get(`https://graph.facebook.com/v18.0/debug_token`, {
    params: {
      input_token: accessToken,
      access_token:
        process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID +
        '|' +
        process.env.FACEBOOK_CLIENT_SECRET,
    },
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { recipientPhone, message, whatsAppToken } = req.body
  // const authToken = whatsAppToken
  const authToken =
    'EAAZAhUvSBby8BOyewiGrKtmVxvaCOgFOgDnvnipkunfNc5wLJsSOvEtjVIjugls60rxJ6hifGIFmYjp36rVjhUZAcuq6yhkpcWZCWKy43FgzJVz8MNAMjNCOZAPjJTSwpKAcosSEch6t9r8e7GfZC7RVB9JSd63hk1sbMt1RxW2rUWR01slJxgsrKOmdATnnxoR5aqErBsf7ic4DgZBaEZD'

  // debug token
  let debugToken
  try {
    debugToken = await getWhatsAppBusinessDetails(authToken)
  } catch (error) {
    console.error(error.response)
  }
  console.log('debugToken:', debugToken.data)

  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipientPhone,
    type: 'text',
    text: {
      // preview_url: false,
      body: message,
    },
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        // 'Content-Type': 'application/json',
      },
    }

    const response = await axios.post(
      'https://graph.facebook.com/v13.0/307932205726236/messages',
      data,
      config
    )

    console.log(response.data)

    await axios.post(
      `https://us-central1-homeearthnet.cloudfunctions.net/initialMessage`,
      {
        to: recipientPhone,
        message: message,
      }
    )
  } catch (error) {
    console.error(error.response.data)
    return res.status(500).json({ message: "Couldn't send message", error })
  }
  return res.status(200).json({ message: 'Message sent' })
}
