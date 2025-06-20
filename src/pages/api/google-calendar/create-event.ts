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

    try {
      const response = await fetch(
        'https://hometrics0001.vercel.app/api/save-calendar-to-database',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId,
            startTime,
            endTime,
            eventName,
            inviteeEmail,
            eventDescription,
            calendarEmail,
          }),
        }
      )

      if (!response.ok) {
        console.error(
          'Failed to save calendar event to database:',
          await response.text()
        )
      }
    } catch (dbError) {
      console.error(
        'Error calling API to save calendar event to database:',
        dbError
      )
    }

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
