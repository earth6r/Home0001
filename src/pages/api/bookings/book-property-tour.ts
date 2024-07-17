import { initializeAdmin } from '@lib/firebase/admin'
import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes
import admin from 'firebase-admin' // Firebase Admin SDK
import { validateBooking, validateProperty } from './validate'
import { sendWhatsappBookedMessage } from './send-whatsapp-booked-message'
import createCalendarEvent from './book-google-calendar-event'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// curl -X POST http://localhost:3000/api/book-property-tour -H "Content-Type: application/json" -d '{"email":"apinanapinan@icloud.com","timestamp":"1720441800000","property":"unit-6a","phoneNumber":"1234567890"}'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response = validateBooking(req) // Validate the request body

  if (response.error) {
    res.status(response.status).json(response) // Respond with error if there is an error
    return
  }

  const propertyResponse = validateProperty(req)

  if (propertyResponse.error) {
    res.status(propertyResponse.status).json(propertyResponse) // Respond with error if there is an error
    return
  }

  const {
    email = null,
    startTimestamp = null,
    endTimestamp = null,
    property = null,
    phoneNumber = null,
    firstName = null,
    lastName = null,
    notes = null,
  } = req.body

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  await db.collection('usersBookPropertyTour').add({
    email,
    property,
    startTimestamp,
    endTimestamp,
    phoneNumber,
    firstName,
    lastName,
    notes,
  })

  try {
    createCalendarEvent({
      date: startTimestamp.split(' ')[0],
      startTime: startTimestamp.split(' ')[1].split(':')[0],
      eventName: 'Property Tour',
      inviteeEmail: email,
      location: 'TBD',
      eventDescription: 'Property Tour',
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating calendar event', error)
  }

  await sendWhatsappBookedMessage(firstName, lastName, startTimestamp)

  res.status(200).json({
    status: 'success',
  })
}
