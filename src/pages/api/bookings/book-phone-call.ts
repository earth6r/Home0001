import { initializeAdmin } from '@lib/firebase/admin'
import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes
import admin from 'firebase-admin' // Firebase Admin SDK
import { sendWhatsappBookedMessage } from './send-whatsapp-booked-message'
import { validateBooking } from './validate'
import createCalendarEvent from './book-google-calendar-event'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

export function parseTimestamp(timestamp: string) {
  let [datePart, timePart] = timestamp.split(' ')
  let [year, month, day] = datePart.split('-').map(Number)
  let [hours, minutes, seconds] = timePart.split(':').map(Number)

  return Number(
    new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds)).getTime()
  )
}

// curl -X POST http://localhost:3000/api/book-phone-call -H "Content-Type: application/json" -d '{"email":"apinanapinan@icloud.com","timestamp":"1720441800000","phoneNumber":"1234567890"}'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response = validateBooking(req) // Validate the request body

  if (response.error) {
    res.status(response.status).json(response) // Respond with error if there is an error
    return
  }

  const {
    email = null,
    firstName = null,
    lastName = null,
    notes = null,
    startTimestamp = null,
    endTimestamp = null,
    phoneNumber = null,
    blockWhatsApp = false,
  } = req.body

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  const startTimestampFormatted = parseTimestamp(startTimestamp)
  const endTimestampFormatted = parseTimestamp(endTimestamp)

  await db.collection('usersBookPhoneCall').add({
    email,
    startTimestamp: startTimestampFormatted,
    endTimestamp: endTimestampFormatted,
    firstName,
    lastName,
    notes,
    phoneNumber,
  })

  try {
    createCalendarEvent({
      startTime: startTimestamp,
      endTime: endTimestamp,
      eventName: 'Zoom with HOME0001',
      inviteeEmail: email,
      eventDescription: `You're scheduled for a zoom call with HOME0001.`,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating calendar event', error)
  }

  if (!blockWhatsApp) {
    try {
      await sendWhatsappBookedMessage(
        firstName,
        lastName,
        startTimestamp,
        email,
        phoneNumber
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending WhatsApp message', error)
    }
  }

  res.status(200).json({
    status: 'success',
  })
}
