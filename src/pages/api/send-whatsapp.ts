import { initializeAdmin } from '@lib/firebase/admin'
import { DoNotSendMessagesNumbers } from '@lib/util/constants'
import { saveError } from '@lib/util/save-error'
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { sendTwilioMessage } from './messages/send-twilio-message'

const axios = require('axios')

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
  template: string | null = null,
  initialMessage: boolean = true,
  sendInRocketChat: boolean = true
) => {
  // const authToken = process.env.WHATSAPP_PERMANENT_TOKEN

  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken)

  const _template = template || 'primary_test'
  let _message = message

  // NO FILLER MESSAGE NEEDED: first_direct_communication_notification, chat

  if (_template === 'first_rocket_chat_message_notification') {
    _message = `NEW ROCKET CHAT MESSAGE: \n\n${message}`
  } else if (_template === 'phone_call_rescheduled') {
    _message = `PHONE CALL RESCHEDULED (via online scheduler): \n\n${message}`
  } else if (_template === 'property_tour_rescheduled') {
    _message = `PROPERTY TOUR RESCHEDULED (via online scheduler): \n\n${message}`
  } else if (_template === 'property_tour_booked') {
    _message = `PROPERTY TOUR BOOKED (via online scheduler): \n\n${message}`
  } else if (_template === 'property_tour_event_in_1h') {
    // this will never get called in this function
    _message = `PROPERTY TOUR HAPPENING IN 1 HOUR: \n\n${message}`
  } else if (_template === 'primary_test') {
    _message = `PHONE CALL SCHEDULED (via online scheduler): \n\n${message}`
  }

  // const data = {
  //   messaging_product: 'whatsapp',
  //   to: recipientPhone,
  //   type: 'template',
  //   template: {
  //     name: template || 'primary_test',
  //     language: {
  //       code: 'en',
  //     },
  //     components: [
  //       {
  //         type: 'body',
  //         parameters: [
  //           {
  //             type: 'text',
  //             text: message,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // }

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  try {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // }

    // const response = await axios.post(
    //   'https://graph.facebook.com/v13.0/307932205726236/messages',
    //   data,
    //   config
    // )

    await sendTwilioMessage(recipientPhone, _message, sendInRocketChat)

    if (initialMessage) {
      await axios.post(
        `https://us-central1-homeearthnet.cloudfunctions.net/initialMessage`,
        {
          to: recipientPhone,
          message: message,
        }
      )
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Couldn't send message", error)
    saveError(error, 'sendMessage')
    throw error
  }
}

export const sendWAMessagePropertyTourBooked = async (
  recipientPhone: string,
  message: string
) => {
  // const authToken = process.env.WHATSAPP_PERMANENT_TOKEN

  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken)

  // const data = {
  //   messaging_product: 'whatsapp',
  //   to: recipientPhone,
  //   type: 'template',
  //   template: {
  //     name: 'property_tour_booked',
  //     language: {
  //       code: 'en',
  //     },
  //     components: [
  //       {
  //         type: 'body',
  //         parameters: [
  //           {
  //             type: 'text',
  //             text: message,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // }

  let _message = `PROPERTY TOUR BOOKED (via online scheduler): \n\n${message}`

  try {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // }

    // const response = await axios.post(
    //   'https://graph.facebook.com/v13.0/307932205726236/messages',
    //   data,
    //   config
    // )

    await sendTwilioMessage(recipientPhone, _message, false)

    await axios.post(
      `https://us-central1-homeearthnet.cloudfunctions.net/initialMessage`,
      {
        to: recipientPhone,
        message: message,
      }
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Couldn't send message", error)
    saveError(error, 'sendMessage')
    throw error
  }
}

export const sendWAMessageReschedulePhoneCall = async (
  recipientPhone: string,
  message: string
) => {
  // const authToken = process.env.WHATSAPP_PERMANENT_TOKEN

  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken)

  // const data = {
  //   messaging_product: 'whatsapp',
  //   to: recipientPhone,
  //   type: 'template',
  //   template: {
  //     name: 'phone_call_rescheduled',
  //     language: {
  //       code: 'en',
  //     },
  //     components: [
  //       {
  //         type: 'body',
  //         parameters: [
  //           {
  //             type: 'text',
  //             text: message,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // }

  try {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // }

    // const response = await axios.post(
    //   'https://graph.facebook.com/v13.0/307932205726236/messages',
    //   data,
    //   config
    // )

    let _message = `PHONE CALL RESCHEDULED (via online scheduler): \n\n${message}`

    await sendTwilioMessage(recipientPhone, _message, false)

    await axios.post(
      `https://us-central1-homeearthnet.cloudfunctions.net/initialMessage`,
      {
        to: recipientPhone,
        message: message,
      }
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Couldn't send message", error)
    saveError(error, 'sendMessage')
    throw error
  }
}

export const sendWAMessageReschedulePropertyTour = async (
  recipientPhone: string,
  message: string
) => {
  // const authToken = process.env.WHATSAPP_PERMANENT_TOKEN

  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken)

  // const data = {
  //   messaging_product: 'whatsapp',
  //   to: recipientPhone,
  //   type: 'template',
  //   template: {
  //     name: 'property_tour_rescheduled',
  //     language: {
  //       code: 'en',
  //     },
  //     components: [
  //       {
  //         type: 'body',
  //         parameters: [
  //           {
  //             type: 'text',
  //             text: message,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // }

  let _message = `PROPERTY TOUR RESCHEDULED (via online scheduler): \n\n${message}`

  if (DoNotSendMessagesNumbers.includes(recipientPhone)) {
    return
  }

  try {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // }

    await sendTwilioMessage(recipientPhone, _message, false)

    await axios.post(
      `https://us-central1-homeearthnet.cloudfunctions.net/initialMessage`,
      {
        to: recipientPhone,
        message: message,
      }
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Couldn't send message", error)
    saveError(error, 'sendMessage')
    throw error
  }
}

export const sendPropertyTourBookedIn1HourMessage = async (
  recipientPhone: string,
  name: string,
  email: string,
  date: string,
  phoneNumber: string,
  details: string
) => {
  // const authToken = process.env.WHATSAPP_PERMANENT_TOKEN

  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN

  // require the Twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken)

  // const data = {
  //   messaging_product: 'whatsapp',
  //   to: recipientPhone,
  //   type: 'template',
  //   template: {
  //     name: 'property_tour_event_in_1h',
  //     language: {
  //       code: 'en',
  //     },
  //     components: [
  //       {
  //         type: 'body',
  //         parameters: [
  //           {
  //             type: 'text',
  //             text: name,
  //           },
  //           {
  //             type: 'text',
  //             text: email,
  //           },
  //           {
  //             type: 'text',
  //             text: date,
  //           },
  //           {
  //             type: 'text',
  //             text: phoneNumber,
  //           },
  //           {
  //             type: 'text',
  //             text: details,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // }

  try {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // }

    // const response = await axios.post(
    //   'https://graph.facebook.com/v13.0/307932205726236/messages',
    //   data,
    //   config
    // )

    let _message = `PROPERTY TOUR BOOKED IN 1 HOUR: \n\nName: ${name} \nEmail: ${email} \nDate: ${date} \nPhone Number: ${phoneNumber} \n${details}`

    await sendTwilioMessage(recipientPhone, _message)

    // TODO: discuss with @YannyD and fix this
    // await axios.post(
    //   `https://us-central1-homeearthnet.cloudfunctions.net/initialMessage`,
    //   {
    //     to: recipientPhone,
    //     message: message,
    //   }
    // )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Couldn't send message", error)
    saveError(error, 'sendMessage')
    throw error
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { template = null, saveInRocketchat = 'true' } = req.query as {
    template: string | null
    saveInRocketchat: string
  }
  const { recipientPhone, message } = req.body

  try {
    await sendMessage(
      recipientPhone,
      message,
      template,
      true,
      saveInRocketchat === 'true'
    )
  } catch (error) {
    saveError(error, 'send-whatsapp')
    return res.status(500).json({ message: "Couldn't send message", error })
  }
  return res.status(200).json({ message: 'Message sent' })
}
