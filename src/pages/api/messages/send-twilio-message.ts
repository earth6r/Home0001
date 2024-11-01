import { initializeAdmin } from '@lib/firebase/admin'
import { DoNotSendMessagesNumbers } from '@lib/util/constants'
import { saveError } from '@lib/util/save-error'
import admin from 'firebase-admin'

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken)

export const sendTwilioMessage = async (
  recipientPhone: string,
  message: string
) => {
  if (DoNotSendMessagesNumbers.includes(recipientPhone)) {
    return
  }

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  try {
    await client.messages.create({
      to: recipientPhone,
      from: '+19737915529',
      body: message,
    })
  } catch (error) {
    console.error(error)
    saveError(error, 'sendTwilioMessage')
  }

  await db.collection('textMessagesHistory').add({
    recipientPhone,
    from: '+19737915529',
    message: message,
    createdAt: Math.floor(new Date().getTime() / 1000),
    method: 'twilio',
    type: 'sms',
  })
}
