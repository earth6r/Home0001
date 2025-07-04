import { saveError } from '@lib/util/save-error'
import axios from 'axios'
import moment from 'moment-timezone'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// db endpoints
export const getBuyingProgress = async (email: string) => {
  try {
    return await axios.get(
      `${BASE_URL}/api/get-buying-progress?email=${email}`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getBuyingProgress')
  }
}

export const updateBuyingProgress = async (email: string, step: string) => {
  try {
    // buying progress stages: escrow-deposit, schedule-closing, download-documents, full-payment, completed
    return await axios.post(
      `${BASE_URL}/api/update-buying-progress`,
      { email: email, buyingProgress: step },
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'updateBuyingProgress')
  }
}

export const accountSignIn = async (email: string, password: string) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/login/signin`,
      { email: email, password: password },
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'accountSignIn')
  }
}

export const getAccount = async (email: string) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/login/check-password-setup-for-email`,
      { email: email },
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getAccount')
  }
}

// stripe
export const setPaymentIntent = async (
  email: string,
  unit: string,
  amount: number
) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/create-stripe-payment`,
      { propertyType: unit, email: email, amount: amount },
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'setPaymentIntent')
  }
}

// google calendar api
export const getAvailableSlots = async () => {
  try {
    return await axios.post(
      `${BASE_URL}/api/google/available-meeting-hours?email=lowereastside@home0001.com`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getAvailableSlots')
  }
}

export const createGoogleCalendarMeeting = async (
  startTime: string,
  endTime: string,
  email: string
) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/google-calendar/create-event`,
      {
        startTime: startTime,
        endTime: endTime,
        inviteeEmail: email,
        eventName: 'HOME0001 Meeting',
        eventDescription: `Home0001 meeting re: membership`,
        calendarEmail: 'lowereastside@home0001.com',
      },
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'createGoogleCalendarMeeting')
  }
}

export const updateGoogleCalendarMeeting = async (
  eventId: string,
  startTime: string,
  endTime: string,
  email: string
) => {
  try {
    return await axios.put(
      `${BASE_URL}/api/google-calendar/update-event`,
      {
        eventId: eventId,
        startTime: startTime,
        endTime: endTime,
        inviteeEmail: email,
        eventName: 'HOME0001 Meeting',
        eventDescription: `Home0001 meeting re: membership`,
        calendarEmail: 'lowereastside@home0001.com',
      },
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'updateGoogleCalendarMeeting')
  }
}

export const getBookedCalendarDate = async (email: string) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/google/get-booked-calendar-date?email=${email}`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getBookedCalendarDate')
  }
}
