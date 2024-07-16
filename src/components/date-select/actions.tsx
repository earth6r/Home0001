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

export const createGoogleCalendarMeeting = async (
  data: any,
  email: string,
  unit: string
  // additionalEmails?: string[]
) => {
  return await axios.post(
    `${BASE_URL}/api/google/create-google-calendar_meeting`,
    {
      date: data.date,
      startTime: data.startTime,
      eventName: 'HOME0001 Closing',
      inviteeEmail: email,
      staffEmails: [
        email,
        // 'dzelefsky@braverlaw.net',
        // 'scott@choicefamily.com',
        // 'Matthew@omnititle.com',
        // 'gio@choicefamily.com',
        // 'andres@hoggholdings.com',
        // 'annika@home0001.com',
        'yan@home0001.com',
        // 'm@choicefamily.com',
      ],
      location: 'Link will be emailed',
      eventDescription: `Home0001 closing for ${unit}`,
      // additionalEmails: additionalEmails,
    },
    CONFIG
  )
}

export const getBookedCalendarDate = async (email: string) => {
  return await axios.post(
    `${BASE_URL}/api/google/get-booked-calendar-date?email=${email}`,
    CONFIG
  )
}
