// TODO: need to only create calendar and send wa message and update hubspot
import { initializeAdmin } from '@lib/firebase/admin'
import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes
import admin from 'firebase-admin' // Firebase Admin SDK
import { sendWhatsappBookedMessage } from './send-whatsapp-booked-message'
import { validateBooking } from './validate'
import createCalendarEvent from './book-google-calendar-event'
import { updateHubspotContact } from './update-hubspot-contact'
import { saveError } from '@lib/util/save-error'
import { sendMessage } from '../send-whatsapp'

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

// TODO: make reusable function of creating calendar and whatsapp message sending with optional blockWhatsApp parameter
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
    startTimestamp = null,
    endTimestamp = null,
    phoneNumber = null,
    blockWhatsApp = false,
  } = req.body

  const startTimestampFormatted = parseTimestamp(startTimestamp)

  try {
    createCalendarEvent({
      startTime: startTimestamp,
      endTime: endTimestamp,
      eventName: 'Zoom with HOME0001',
      inviteeEmail: email,
      eventDescription: `You're scheduled for a Zoom call with HOME0001.`,
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
        true
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending WhatsApp message', error)
      saveError(error, 'sendWhatsappBookedMessage')
    }
  }

  // try {
  //   await updateHubspotContact(
  //     email,
  //     new Date(startTimestampFormatted),
  //     firstName,
  //     lastName
  //   )
  // } catch (error: any) {
  //   // eslint-disable-next-line no-console
  //   console.error('Error updating HubSpot contact', error)
  //   const errorData = {
  //     error,
  //     additionalInfo: {
  //       email,
  //       startTimestamp: startTimestampFormatted,
  //       response: error.response ? error.response.data : null,
  //     },
  //   }

  //   saveError(errorData, 'updateHubspotContact')
  //   sendMessage(
  //     '+17134103755',
  //     `Error updating HubSpot contact: ${email}. Most likely the contact does not exist in HubSpot.`
  //   )
  // }

  res.status(200).json({
    status: 'success',
  })
}
