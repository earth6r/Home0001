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
  const startTimeDate = new Date(data.startTime)
  const endTimeDate = new Date(
    startTimeDate.setHours(startTimeDate.getHours() + 0.25)
  )
  return await axios.post(
    `${BASE_URL}/api/bookings/book-phone-call`,
    {
      date: data.date,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      notes: data.notes,
      startTimestamp: startTimeDate
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
      endTimestamp: endTimeDate
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
      phoneNumber: data.phoneNumber,
    },
    CONFIG
  )
}
