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
  const startDateTimePlus = startDateTime.setMinutes(
    startDateTime.getMinutes() + 15
  )
  const endDateTime = new Date(startDateTimePlus)
  console.log('startDateTime', startDateTime)
  console.log('endDateTime', endDateTime)
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
