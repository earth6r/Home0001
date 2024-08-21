import { initializeAdmin } from '@lib/firebase/admin'
import createCalendarEvent from '@lib/util/book-google-calendar-event'
import { saveError } from '@lib/util/save-error'
import { sendWhatsappBookedMessage } from '@lib/util/send-whatsapp-booked-message'
import { updateHubspotContact } from '@lib/util/update-hubspot-contact'
import admin from 'firebase-admin' // Firebase Admin SDK
import { NextApiRequest, NextApiResponse } from 'next/types'
import { sendMessage } from '../send-whatsapp'
import { parseTimestamp } from './book-property-tour'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // dates are formatted as YYYY-MM-DD HH:mm:ss in UTC tz
  const { uid, startTimestamp, endTimestamp } = req.body

  const startTimestampFormatted = parseTimestamp(startTimestamp)
  const endTimestampFormatted = parseTimestamp(endTimestamp)

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  const bookingRef = db.collection('usersBookPropertyTour').doc(uid)

  const booking = await bookingRef.get()

  if (!booking.exists) {
    res.status(404).json({
      status: 'error',
      message: 'Booking not found',
    })
    return
  }

  const { email, firstName, lastName, phoneNumber } = booking.data() as {
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
  }

  await bookingRef.update({
    startTimestamp: startTimestampFormatted,
    endTimestamp: endTimestampFormatted,
    status: 'scheduled',
  })

  try {
    const googleCalendarEventId = await createCalendarEvent({
      startTime: startTimestamp,
      endTime: endTimestamp,
      eventName: 'Property Tour with HOME0001',
      inviteeEmail: email,
      eventDescription: `You're scheduled for a property tour with HOME0001.`,
      calendarEmail: 'lowereastside@home0001.com',
      zoom: false,
    })

    await bookingRef.update({
      googleCalendarEventId,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating calendar event', error)
    saveError(error, 'createCalendarEvent')
  }

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

  try {
    await updateHubspotContact(
      email,
      new Date(startTimestampFormatted),
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
