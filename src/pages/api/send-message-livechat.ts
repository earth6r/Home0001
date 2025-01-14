import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { saveError } from '@lib/util/save-error'
import { createVisitorAndChatRoom } from './rocketchat/livechat'
import { sendTwilioMessage } from './messages/send-twilio-message'

export const config = {
  maxDuration: 300,
}

type Data = {
  message: string
  error?: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { recipientPhone, message, name, email } = req.body

  try {
    // createVisitorAndChatRoom(name, email, recipientPhone, message)

    await sendTwilioMessage(recipientPhone, message, false)

    await axios.post(
      `https://us-central1-homeearthnet.cloudfunctions.net/initialMessage`,
      {
        to: recipientPhone,
        message: message,
      }
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'sendMessage')
    res.status(500).json({ message: "Couldn't send message", error })
    return
  }
  res.status(200).json({ message: 'Message sent' })
}
