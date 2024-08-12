import { saveError } from '@lib/util/save-error'
import type { NextApiRequest, NextApiResponse } from 'next'

const axios = require('axios')

type Data = {
  message: string
  error?: unknown
}

export const sendMessage = async (recipientPhone: string, message: string) => {
  const authToken = process.env.WHATSAPP_PERMANENT_TOKEN

  const data = {
    messaging_product: 'whatsapp',
    to: recipientPhone,
    type: 'template',
    template: {
      name: 'primary_test',
      language: {
        code: 'en',
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: message,
            },
          ],
        },
      ],
    },
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }

    const response = await axios.post(
      'https://graph.facebook.com/v13.0/307932205726236/messages',
      data,
      config
    )

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
  const authToken = process.env.WHATSAPP_PERMANENT_TOKEN

  const data = {
    messaging_product: 'whatsapp',
    to: recipientPhone,
    type: 'template',
    template: {
      name: 'property_tour_event_in_1h',
      language: {
        code: 'en',
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: name,
            },
            {
              type: 'text',
              text: email,
            },
            {
              type: 'text',
              text: date,
            },
            {
              type: 'text',
              text: phoneNumber,
            },
            {
              type: 'text',
              text: details,
            },
          ],
        },
      ],
    },
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }

    const response = await axios.post(
      'https://graph.facebook.com/v13.0/307932205726236/messages',
      data,
      config
    )

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
  const { recipientPhone, message } = req.body

  try {
    await sendMessage(recipientPhone, message)
  } catch (error) {
    saveError(error, 'send-whatsapp')
    return res.status(500).json({ message: "Couldn't send message", error })
  }
  return res.status(200).json({ message: 'Message sent' })
}
