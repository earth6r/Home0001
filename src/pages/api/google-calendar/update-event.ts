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

    // Update Google Calendar event
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

    // Update database record
    try {
      const response = await fetch(
        'https://hometrics0001.vercel.app/api/google-calendar/update-calendar',
        {
          method: 'PUT',
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
        console.error('Failed to update database:', await response.text())
        // Don't fail the entire request if database update fails
        // Just log the error and continue
      }
    } catch (dbError) {
      console.error('Error updating database:', dbError)
      // Don't fail the entire request if database update fails
      // Just log the error and continue
    }

    return res.status(200).json({ success: true, eventId: updatedEventId })
  } catch (error) {
    console.error('Error updating calendar event:', error)
    return res.status(500).json({
      error: 'Failed to update calendar event',
      details:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}
