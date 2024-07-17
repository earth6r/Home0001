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

export const bookPhoneCall = async (data: any) => {
  console.log('data', data)
  const startDateTime = new Date(`${data.date} ${data.startTime}`)
  const endDateTime = new Date(
    startDateTime.setMinutes(startDateTime.getMinutes() + 15)
  )
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
      firstName: data.firstName,
      lastName: data.lastName,
      notes: data.notes,
      phoneNumber: data.phoneNumber,
    },
    CONFIG
  )
}
