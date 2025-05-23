import { saveError } from '@lib/util/save-error'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createVisitorAndChatRoom } from './rocketchat/livechat'
import { sendTwilioMessage } from './messages/send-twilio-message'
import axios from 'axios'

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
  initialMessage: boolean = true
) => {
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

  try {
    await sendTwilioMessage(recipientPhone, _message, false, true, {
      _source: '/chat',
    })

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { template = null } = req.query as { template: string | null }
  const { recipientPhone, message, name, email } = req.body

  try {
    // createVisitorAndChatRoom(name, email, recipientPhone, message)

    await sendMessage(recipientPhone, message, template)
  } catch (error) {
    saveError(error, 'send-whatsapp')
    return res.status(500).json({ message: "Couldn't send message", error })
  }
  return res.status(200).json({ message: 'Message sent' })
}
