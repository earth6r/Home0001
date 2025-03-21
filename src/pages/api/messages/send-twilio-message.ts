import { initializeAdmin } from '@lib/firebase/admin'
import { DoNotSendMessagesNumbers } from '@lib/util/constants'
import { saveError } from '@lib/util/save-error'
import admin from 'firebase-admin'
import { createVisitorAndChatRoom } from '../rocketchat/livechat'

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken)

export const config = {
  maxDuration: 300,
}

export const sendTwilioMessage = async (
  recipientPhone: string,
  message: string,
  saveInRocketchat = true,
  automatedToUser = false,
  additionalFields: Record<string, any> = {}
) => {
  if (DoNotSendMessagesNumbers.includes(recipientPhone)) {
    return
  }

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  if (saveInRocketchat) {
    createVisitorAndChatRoom('', '', recipientPhone, message)
  }

  try {
    console.error('Sending Twilio message to', recipientPhone)
    await client.messages.create({
      to: recipientPhone,
      from: '+19737915529',
      body: message,
    })
    console.error('Twilio message sent to', recipientPhone)
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
    automated: automatedToUser,
    ...additionalFields,
  })
}
