import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { saveError } from '@lib/util/save-error'
import { sendTwilioMessage } from './messages/send-twilio-message'

type Data = {
  message: string
  error?: unknown
}

export const config = {
  maxDuration: 300,
}

export const sendMessage = async (recipientPhone: string, message: string) => {
  await sendTwilioMessage(recipientPhone, message)

  await axios.post(
    `https://us-central1-homeearthnet.cloudfunctions.net/initialMessage`,
    {
      to: recipientPhone,
      message: message,
    }
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  try {
    const { recipientPhone, message } = req.body
    await sendMessage(recipientPhone, message)
  } catch (error) {
    console.error(error)
    saveError(error, 'sendMessage')
    return res.status(500).json({ message: "Couldn't send message", error })
  }
  return res.status(200).json({ message: 'Message sent' })
}
