import type { NextApiRequest, NextApiResponse } from 'next/types'
import { sendTwilioMessage } from './send-twilio-message'

export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { recipientPhone, message, followUpCount = 0 } = req.body

  await sendTwilioMessage(recipientPhone, message, false, true, {
    template: 'text-instagram-leads-waitlist',
    followUpCount,
    replied: false,
  })
  res.status(200).json({ message: 'success' })
}
