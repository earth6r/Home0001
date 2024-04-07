import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  error?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  console.log('req.body:', req.body)
  const { recipientPhone, message } = req.body

  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
  console.log('authToken:', authToken)

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
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Couldn't send message", error })
  }
  return res.status(200).json({ message: 'Message sent' })
}
