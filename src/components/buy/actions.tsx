import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// db endpoints
export const getBuyingProgress = async (email: string) => {
  return await axios.get(
    `${BASE_URL}/api/get-buying-progress?email=${email}`,
    CONFIG
  )
}

export const accountSignIn = async (email: string, password: string) => {
  return await axios.post(
    `${BASE_URL}/api/login/signin`,
    { email: email, password: password },
    CONFIG
  )
}

export const getAccount = async (email: string) => {
  return await axios.post(
    `${BASE_URL}/api/login/check-password-setup-for-email`,
    { email: email },
    CONFIG
  )
}

// stripe
export const setPaymentIntent = async (unit: string) => {
  return await axios.post(
    `${BASE_URL}/api/create-stripe-payment`,
    { propertyType: unit },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

// google calendar api
export const getAvailableSlots = async () => {
  return await axios.post(`${BASE_URL}/api/google/available-meeting-hours`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const createGoogleCalendarMeeting = async (
  data: any,
  email: string,
  unit: string
) => {
  return await axios.post(
    `${BASE_URL}/api/google/create-google-calendar_meeting`,
    {
      date: data.date,
      startTime: data.startTime,
      eventName: 'HOME0001 Closing',
      inviteeEmail: email,
      staffEmails: [
        'dzelefsky@braverlaw.net',
        'scott@choicefamily.com',
        'Matthew@omnititle.com',
        'gio@choicefamily.com',
        'andres@hoggholdings.com',
        'annika@home0001.com',
        'yan@home0001.com',
        'm@choicefamily.com',
      ],
      location: 'Link will be emailed',
      eventDescription: `Home0001 closing for ${unit}`,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
