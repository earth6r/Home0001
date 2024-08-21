import { initializeAdmin } from '@lib/firebase/admin'
import { saveError } from '@lib/util/save-error'
import admin from 'firebase-admin' // Firebase Admin SDK
import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes
import createCalendarEvent from '../../../lib/util/book-google-calendar-event'
import { sendWhatsappBookedMessage } from '../../../lib/util/send-whatsapp-booked-message'
import { updateHubspotContact } from '../../../lib/util/update-hubspot-contact'
import { sendMessage } from '../send-whatsapp'
import { validateBooking } from './validate'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// TODO: move to a utils or something (booking-utils.ts)
export function parseTimestamp(timestamp: string) {
  let [datePart, timePart] = timestamp.split(' ')
  let [year, month, day] = datePart.split('-').map(Number)
  let [hours, minutes, seconds] = timePart.split(':').map(Number)

  return Number(
    new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds)).getTime()
  )
}

// curl -X POST http://localhost:3000/api/bookings/book-phone-call -H "Content-Type: application/json" -d '{"email":"apinanapinan@icloud.com","timestamp":"1720441800000","phoneNumber":"1234567890"}'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response = validateBooking(req) // Validate the request body

  if (response.error) {
    // TODO: remove after since this is just a call error by client
    console.error('Error validating booking', response.error)
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

  const firebaseResponse = await db.collection('usersBookPhoneCall').add({
    email,
    startTimestamp: startTimestampFormatted,
    endTimestamp: endTimestampFormatted,
    firstName,
    lastName,
    notes,
    phoneNumber,
  })

  try {
    const googleCalendarEventId = await createCalendarEvent({
      startTime: startTimestamp,
      endTime: endTimestamp,
      eventName: 'Zoom with HOME0001',
      inviteeEmail: email,
      eventDescription: `A member of the HOME0001 collective will meet you on Zoom to answer all your questions, talk you through upcoming home releases and schedule a tour. You can find the Zoom link above ^^ or you can follow this link: <a href="https://zoom.us/j/9199989063?pwd=RzhRMklXNWdJNGVKZjRkRTdkUmZOZz09">JOIN CALL</a><br><br>If you'd prefer us to give you a call, please share your number & preferred channel (WhatsApp, Facetime, Signal, Telegram).<br><br>In case you need to reschedule or just can't make it, please let us know so we can coordinate with the team.`,
      calendarEmail: 'talin@home0001.com',
    })

    firebaseResponse.update({
      googleCalendarEventId,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating calendar event', error)
    saveError(error, 'createCalendarEvent')
  }

  if (!blockWhatsApp) {
    try {
      await sendWhatsappBookedMessage(
        firstName,
        lastName,
        startTimestamp,
        email,
        phoneNumber,
        false,
        false
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending WhatsApp message', error)
      saveError(error, 'sendWhatsappBookedMessage')
    }
  }

  try {
    await updateHubspotContact(
      email,
      new Date(startTimestampFormatted),
      firstName,
      lastName
    )
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Error updating HubSpot contact', error)
    const errorData = {
      error,
      additionalInfo: {
        email,
        startTimestamp: startTimestampFormatted,
        response: error.response ? error.response.data : null,
      },
    }

    saveError(errorData, 'updateHubspotContact')
    sendMessage(
      '+17134103755',
      `Error updating HubSpot contact: ${email}. Most likely the contact does not exist in HubSpot.`
    )
  }

  res.status(200).json({
    status: 'success',
  })
}
