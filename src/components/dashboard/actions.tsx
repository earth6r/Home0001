import { saveError } from '@lib/util/save-error'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
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
