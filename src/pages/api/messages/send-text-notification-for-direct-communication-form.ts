import { NextApiRequest, NextApiResponse } from 'next/types'
import { sendMessage as sendWhatsApp } from '../send-whatsapp'
import { sendMessage } from '../send-message'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    communication_pref,
    // email,
    first_name,
    last_name,
    phone_number,
  } = req.body

  const message = `Hello ${first_name} ${last_name}, we have received your form submission and will get back to you soon.`

  if (communication_pref === 'whatsapp') {
    await sendWhatsApp(
      phone_number,
      message,
      'first_direct_communication_notification',
      true,
      false,
      true
    )
  } else if (communication_pref === 'sms') {
    await sendMessage(phone_number, message)
  }

  res.status(200).json({ message: 'Message sent' })
}
