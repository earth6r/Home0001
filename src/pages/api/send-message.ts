import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  message: string
  error?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { recipientPhone, message } = req.body

  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken)

  try {
    client.messages
      .create({
        to: recipientPhone,
        from: '+19737915529',
        body: message,
      })
      .then((message: { sid: any }) => console.log(message.sid))

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
