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
    pending = false, // if true, don't create calendar event, don't save to hubspot, don't send whatsapp message, don't save start and end timestamp to firestore
  } = req.body

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  let startTimestampFormatted
  let endTimestampFormatted

  if (!pending) {
    startTimestampFormatted = parseTimestamp(startTimestamp)
    endTimestampFormatted = parseTimestamp(endTimestamp)
  }

  const firebaseResponse = await db.collection('usersBookPropertyTour').add({
    email,
    ...(pending
      ? {}
      : {
          startTimestamp: startTimestampFormatted,
          endTimestamp: endTimestampFormatted,
        }),
    firstName,
    lastName,
    notes,
    phoneNumber,
    status: pending ? 'pending' : 'scheduled',
  })

  if (pending) {
    res.status(200).json({
      status: 'success',
    })
    return
  }

  try {
    const googleCalendarEventId = await createCalendarEvent({
      startTime: startTimestamp,
      endTime: endTimestamp,
      eventName: 'Tour HOME0001 Lower East Side',
      inviteeEmail: email,
      eventDescription: `A member of the collective will meet you in front of our LES building at 48 Allen St. (btw Hester and Grand) to show you our upcoming studios and 1BR.<br><br>Feel free to call or message anytime at +1 (973) 791-5529 (SMS, WhatsApp) or message Talin at <a href="mailto:talin@home0001.com">talin@home0001.com</a>if you need assistance or have any questions. Please kindly give us a heads up in case you're running late or need to reschedule.`,
      calendarEmail: 'lowereastside@home0001.com',
      zoom: false,
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
        true
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
      new Date(startTimestampFormatted as number),
      firstName,
      lastName,
      'upcoming_property_tour_date'
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
