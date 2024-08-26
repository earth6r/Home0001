import axios from 'axios'
import moment from 'moment-timezone'
import { saveError } from '@lib/util/save-error'
import { FieldValues } from 'react-hook-form'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// google calendar api
export const getAvailableSlots = async (
  email: string,
  notice: string,
  start: string,
  end: string
) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/google/available-meeting-hours?email=${email}&bookingNotice=${notice}&weekStart=${start}&weekEnd=${end}`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getAvailableSlots')
  }
}

export const bookMeeting = async (data: FieldValues, type = 'phone') => {
  const endpoint =
    type === 'phone'
      ? `${BASE_URL}/api/bookings/book-phone-call`
      : `${BASE_URL}/api/bookings/book-property-tour`

  const startDateTime = moment
    .tz(`${data.date} ${data.startTime}`, 'America/New_York')
    .utc()
  const startDateTimePlus = moment
    .tz(`${data.date} ${data.startTime}`, 'America/New_York')
    .utc()

  let endDateTime

  if (type === 'phone') {
    endDateTime = startDateTimePlus.add(15, 'minutes')
  } else {
    endDateTime = startDateTimePlus.add(45, 'minutes')
  }

  const callBookMeeting = async () => {
    return axios.post(
      endpoint,
      {
        email: data.email,
        startTimestamp: startDateTime
          .toISOString()
          .replace('T', ' ')
          .substring(0, 19),
        endTimestamp: endDateTime
          .toISOString()
          .replace('T', ' ')
          .substring(0, 19),
        firstName: data.first_name,
        lastName: data.last_name,
        notes: data.notes,
        phoneNumber: data.phone,
      },
      CONFIG
    )
  }

  const callPreferredComms = async () => {
    return axios.post(
      `${BASE_URL}/api/bookings/set-preferred-communication-medium`,
      {
        email: data.email,
        preferredCommunicationMedium: data.comms,
      },
      CONFIG
    )
  }

  try {
    return await Promise.all([callBookMeeting(), callPreferredComms()])
  } catch (error) {
    console.error(error)
    saveError(error, 'bookingCalendarEvent')
  }
}
