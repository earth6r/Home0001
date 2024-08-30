import { initializeAdmin } from '@lib/firebase/admin'
import { saveError } from '@lib/util/save-error'
import admin from 'firebase-admin' // Firebase Admin SDK
import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes
import { createCalendarEvent } from '../../../lib/util/book-google-calendar-event'
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

    disableTextReminder = false,
    disableCalendarInvite = false,
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

    disableTextReminder,
    disableCalendarInvite,
  })

  if (!disableCalendarInvite) {
    try {
      const googleCalendarEventId = await createCalendarEvent({
        startTime: startTimestamp,
        endTime: endTimestamp,
        eventName: 'Zoom w/HOME0001',
        inviteeEmail: email,
        eventDescription: `A member of the HOME0001 collective will meet you on Zoom to answer your questions and talk you through our available homes. Here’s the meeting link: <br><br><a href="https://zoom.us/j/9199989063?pwd=RzhRMklXNWdJNGVKZjRkRTdkUmZOZz09">JOIN CALL</a><br><br>If you'd like us to call you instead, please share your number & preferred channel (WhatsApp, Facetime, Signal, Telegram).<br><br>Please kindly give us a heads up if you're running late or need to reschedule. Feel free to text us at +1 (973) 791-5529 or contact Talin at talin@home0001.com`,
        calendarEmail: 'talin@home0001.com',
        customizedNotifications: {
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 }, // 1 day before
              { method: 'popup', minutes: 60 }, // 1 hour before
            ],
          },
        },
      })

      firebaseResponse.update({
        googleCalendarEventId,
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating calendar event', error)
      saveError(error, 'createCalendarEvent')
    }
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

  res.status(500).json({
    status: 'success',
  })
}
