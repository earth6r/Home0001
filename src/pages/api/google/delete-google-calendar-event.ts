import { enableCors } from '@lib/next/cors'
import { deleteCalendarEvent } from '@lib/util/book-google-calendar-event'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { eventId, bookingType } = req.body

  if (!eventId) {
    // NOTE: not returning 400 because old bookings may not have eventId
    // res
    //   .status(400)
    //   .json({ success: false, message: 'Missing required fields.' })
    return
  }

  if (!bookingType) {
    res.status(400).json({
      success: false,
      message: 'Missing required field bookingType.',
    })
    return
  }

  const calendarEmail =
    bookingType === 'Property Tour'
      ? 'lowereastside@home0001.com'
      : 'talin@home0001.com'

  await deleteCalendarEvent({
    calendarEmail,
    eventId,
  })

  res.status(200).json({ success: true })
}

export default enableCors(handler)
