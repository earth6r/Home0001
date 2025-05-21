import { NextApiRequest, NextApiResponse } from 'next'
import { updateCalendarEvent } from '../../../lib/util/book-google-calendar-event'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      startTime,
      endTime,
      eventId,
      calendarEmail,
      eventName,
      inviteeEmail,
      eventDescription,
      zoom,
    } = req.body

    // Validate required fields
    if (
      !startTime ||
      !endTime ||
      !eventId ||
      !calendarEmail ||
      !eventName ||
      !inviteeEmail ||
      !eventDescription
    ) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: [
          'startTime',
          'endTime',
          'eventId',
          'calendarEmail',
          'eventName',
          'inviteeEmail',
          'eventDescription',
        ],
      })
    }

    const updatedEventId = await updateCalendarEvent({
      startTime,
      endTime,
      eventId,
      calendarEmail,
      eventName,
      inviteeEmail,
      eventDescription,
      zoom,
    })

    return res.status(200).json({ success: true, eventId: updatedEventId })
  } catch (error) {
    console.error('Error updating calendar event:', error)
    return res.status(500).json({
      error: 'Failed to update calendar event',
      details: error.message,
    })
  }
}
