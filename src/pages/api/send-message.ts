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

export const sendMessage = async (
  recipientPhone: string,
  message: string,
  saveInRocketchat: boolean = true,
  automatedToUser: boolean = false
) => {
  await sendTwilioMessage(
    recipientPhone,
    message,
    saveInRocketchat,
    automatedToUser
  )

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
    const { saveInRocketchat = 'true', automatedToUser = 'false' } = req.query
    const { recipientPhone, message } = req.body
    await sendMessage(
      recipientPhone,
      message,
      saveInRocketchat === 'true',
      automatedToUser === 'true'
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'sendMessage')
    return res.status(500).json({ message: "Couldn't send message", error })
  }
  return res.status(200).json({ message: 'Message sent' })
}
