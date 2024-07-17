import axios from 'axios'

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

export const bookGoogleCalendarEvent = async (data: any) => {
  console.log('data', data)
  return await axios.post(
    `${BASE_URL}/api/bookings/book-google-calendar-event`,
    {
      date: data.date,
      startTime: data.startTime,
      eventName: 'HOME0001 Meeting',
      inviteeEmail: data.email,
      location: 'Link will be emailed',
      eventDescription: `[tk]`,
    },
    CONFIG
  )
}
