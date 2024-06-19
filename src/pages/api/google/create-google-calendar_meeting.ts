/* eslint-disable no-console */
import { enableCors } from '@lib/next/cors'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'google-auth-library'
import axios from 'axios'
import admin from 'firebase-admin'

const Hubspot_Apikey = process.env.NEXT_PUBLIC_HUBSPOT_API_KEY
const Subject = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_IMPERSONATE

const keys = {
  client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_API_PRIVATE_KEY,
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  const {
    date,
    startTime,
    eventName,
    staffEmails,
    inviteeEmail,
    location,
    eventDescription,
    additionalEmails, // Add additionalGuests
  } = req.body

  if (
    !date ||
    !startTime ||
    !eventName ||
    !Array.isArray(staffEmails) ||
    !inviteeEmail ||
    !location ||
    !eventDescription ||
    !Array.isArray(additionalEmails)
  ) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields or staffEmails is not an array.',
    })
    return
  }

  const auth = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
    subject: Subject,
  })

  const calendar = google.calendar({ version: 'v3', auth: auth as any })
  const startDateTime = new Date(`${date}T${startTime}:00.000Z`)
  const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000)

  try {
    const eventsResponse = await calendar.events.list({
      calendarId: Subject,
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: 'America/New_York',
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
        location: location,
        description: eventDescription,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/New_York',
        },
        attendees: [
          { email: Subject },
          ...staffEmails.map((email: string) => ({ email })),
          ...additionalEmails.map((email: string) => ({ email })),
        ],
      }

      const response = await calendar.events.insert({
        calendarId: Subject,
        requestBody: event,
        sendUpdates: 'all',
      })

      if (response?.data?.id) {
        try {
          const startDateTimeInEST = new Date(
            startDateTime.toLocaleString('en-US')
          )
          const closingDate = startDateTimeInEST.toLocaleString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'America/New_York',
          })

          const hubspotResponse = await axios.post(
            `https://api.hubapi.com/contacts/v1/contact/email/${inviteeEmail}/profile`,
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

          const db = admin.firestore()
          const user = await db
            .collection('users')
            .where('email', '==', inviteeEmail)
            .get()

          if (!user.empty) {
            const buyingProgress = await db
              .collection('usersBuyingProgress')
              .where('userUID', '==', user.docs[0].id)
              .get()

            if (!buyingProgress.empty) {
              const buyingProgressValueId = buyingProgress.docs[0].id

              await db
                .collection('usersBuyingProgress')
                .doc(buyingProgressValueId)
                .update({
                  scheduledCalendarDate: closingDate,
                })
            } else {
              console.error('Buying progress not found in Firestore')
            }
          } else {
            console.error('User not found in Firestore')
          }

          res.status(200).json({ success: true, event: response.data.id })
        } catch (error) {
          console.error('Error:', error)
          res.status(500).json({ success: false, error: error })
        }
      } else {
        res
          .status(500)
          .json({ success: false, message: 'Event not created! Try again.' })
      }
    } else {
      res.status(200).json({ success: false, message: 'Slot not available' })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ success: false, error: error })
  }
}

export default enableCors(handler)
