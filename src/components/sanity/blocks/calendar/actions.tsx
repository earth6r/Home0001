import axios from 'axios'
import moment from 'moment-timezone'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// google calendar api
export const getAvailableSlots = async () => {
  return await axios.post(
    `${BASE_URL}/api/google/available-meeting-hours`,
    CONFIG
  )
}

export const bookPhoneCall = async (data: any) => {
  const startDateTime = moment.tz(
    `${data.date} ${data.startTime}`,
    'America/New_York'
  )
  const startDateTimePlus = moment.tz(
    `${data.date} ${data.startTime}`,
    'America/New_York'
  )
  const endDateTime = startDateTimePlus.add(15, 'minutes')
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
}
