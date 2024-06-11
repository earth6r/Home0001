/* eslint-disable no-console */
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'google-auth-library'
import axios from 'axios'

const Hubspot_Apikey = process.env.NEXT_PUBLIC_HUBSPOT_API_KEY
const keys = {
  client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_API_PRIVATE_KEY,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  const { date, startTime, eventName, attendeesEmail } = req.body

  if (!date || !startTime || !eventName) {
    res
      .status(400)
      .json({ success: false, message: 'Missing required fields.' })
    return
  }

  const auth = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  })

  const calendar = google.calendar({ version: 'v3', auth })
  const startDateTime = new Date(`${date}T${startTime}:00.000Z`)
  const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000)

  try {
    const eventsResponse = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = eventsResponse.data.items || []

    let slotAvailable = true
    for (const event of events) {
      // @ts-ignore
      const eventStart = new Date(event.start.dateTime)
      // @ts-ignore
      const eventEnd = new Date(event.end.dateTime)

      if (
        (startDateTime >= eventStart && startDateTime < eventEnd) ||
        (endDateTime > eventStart && endDateTime <= eventEnd) ||
        (startDateTime <= eventStart && endDateTime >= eventEnd)
      ) {
        slotAvailable = false
        break
      }
    }

    if (slotAvailable) {
      const event = {
        summary: eventName,
        start: { dateTime: startDateTime.toISOString() },
        end: { dateTime: endDateTime.toISOString() },
        // attendees: [{ email: attendeesEmail }],
      }
      // @ts-ignore
      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        // sendUpdates:'all'
      })
      if (response?.data?.id) {
        // call hubspot api
        try {
          const closingDate = startDateTime.toLocaleString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })

          const hubspotResponse = await axios.post(
            `https://api.hubapi.com/contacts/v1/contact/email/${attendeesEmail}/profile`,
            {
              properties: [
                {
                  property: 'closing_date',
                  value: closingDate,
                },
              ],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Hubspot_Apikey}`,
              },
            }
          )
          console.log(response)
          res.status(200).json({ success: true, event: response.data.id })
        } catch (error) {
          console.error('Error:', error)
          res.status(500).json({ success: false, error: error })
        }
      } else {
        res
          .status(500)
          .json({ success: false, message: 'Event not create! try again' })
      }
    } else {
      res.status(200).json({ success: false, message: 'Slot not available' })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ success: false, error: error })
  }
}
