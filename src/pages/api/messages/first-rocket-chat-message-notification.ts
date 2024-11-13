import { NextApiRequest, NextApiResponse } from 'next/types'
import { sendMessage } from '../send-whatsapp'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { recipientPhones, message } = req.body

  for (const recipientPhone of recipientPhones) {
    await sendMessage(
      recipientPhone,
      message,
      'first_rocket_chat_message_notification',
      false,
      false
    )
  }
}
