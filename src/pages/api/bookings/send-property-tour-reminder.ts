import { saveError } from '@lib/util/save-error'
import { sendPropertyTourBookedIn1HourMessage } from '../send-whatsapp'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    recipientPhone,
    email,
    firstName,
    lastName,
    phoneNumber,
    startTimestamp,
  } = req.body

  try {
    await sendPropertyTourBookedIn1HourMessage(
      recipientPhone,
      firstName + ' ' + lastName,
      email,
      phoneNumber,
      startTimestamp,
      'https://analytics.home0001.com/bookings-details?email=' + email
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error sending WhatsApp message', error)
    saveError(error, 'sendPropertyTourBookedIn1HourMessage')
  }

  res.status(200).json({
    status: 'success',
  })
}
