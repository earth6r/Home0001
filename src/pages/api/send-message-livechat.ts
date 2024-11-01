import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { saveError } from '@lib/util/save-error'
import { createVisitorAndChatRoom } from './rocketchat/livechat'
import { DoNotSendMessagesNumbers } from '@lib/util/constants'
import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin'

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

  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken)

  if (DoNotSendMessagesNumbers.includes(recipientPhone)) {
    return
  }

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  try {
    createVisitorAndChatRoom(name, email, recipientPhone, message)

    client.messages
      .create({
        to: recipientPhone,
        from: '+19737915529',
        body: message,
      })
      .then((message: { sid: any }) => console.log(message.sid))

    await db.collection('textMessagesHistory').add({
      recipientPhone,
      from: '+19737915529',
      message,
      createdAt: Math.floor(new Date().getTime() / 1000),
      method: 'twilio',
      type: 'sms',
    })

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
