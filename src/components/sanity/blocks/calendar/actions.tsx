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
export const getAvailableSlots = async () => {
  try {
    return await axios.post(
      `${BASE_URL}/api/google/available-meeting-hours-user2`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getAvailableSlots')
  }
}

export const bookPhoneCall = async (data: FieldValues) => {
  const startDateTime = moment
    .tz(`${data.date} ${data.startTime}`, 'America/New_York')
    .utc()
  const startDateTimePlus = moment
    .tz(`${data.date} ${data.startTime}`, 'America/New_York')
    .utc()
  const endDateTime = startDateTimePlus.add(15, 'minutes')

  try {
    return await axios.post(
      `${BASE_URL}/api/bookings/book-phone-call`,
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
  } catch (error) {
    console.error(error)
    saveError(error, 'bookPhoneCall')
  }
}
