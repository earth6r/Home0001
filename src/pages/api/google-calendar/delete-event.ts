import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCalendarEvent } from '../../../lib/util/book-google-calendar-event'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { calendarEmail, eventId } = req.body

    // Validate required fields
    if (!calendarEmail || !eventId) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['calendarEmail', 'eventId'],
      })
    }

    await deleteCalendarEvent({
      calendarEmail,
      eventId,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error deleting calendar event:', error)
    return res.status(500).json({
      error: 'Failed to delete calendar event',
      details:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}
