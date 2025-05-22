import { NextApiRequest, NextApiResponse } from 'next'
import { createCalendarEvent } from '../../../lib/util/book-google-calendar-event'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      startTime,
      endTime,
      eventName,
      inviteeEmail,
      eventDescription,
      calendarEmail,
      zoom,
      customizedNotifications,
    } = req.body

    // Validate required fields
    if (
      !startTime ||
      !endTime ||
      !eventName ||
      !inviteeEmail ||
      !eventDescription ||
      !calendarEmail
    ) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: [
          'startTime',
          'endTime',
          'eventName',
          'inviteeEmail',
          'eventDescription',
          'calendarEmail',
        ],
      })
    }

    const eventId = await createCalendarEvent({
      startTime,
      endTime,
      eventName,
      inviteeEmail,
      eventDescription,
      calendarEmail,
      zoom,
      customizedNotifications,
    })

    return res.status(200).json({ success: true, eventId })
  } catch (error) {
    console.error('Error creating calendar event:', error)
    return res.status(500).json({
      error: 'Failed to create calendar event',
      details:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}
