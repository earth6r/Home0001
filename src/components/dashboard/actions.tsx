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
    return await axios.get(
      `${BASE_URL}/api/google/get-booked-calendar-date?email=${email}`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getBookedCalendarDate')
  }
}

export const updateUserProfile = async (profileData: {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
}) => {
  try {
    await axios.put(
      `${BASE_URL}/api/web3/update-user-profile`,
      {
        id: profileData.id,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        email: profileData.email,
        phoneNumber: profileData.phone_number,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'User profile updated successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'updateUserProfile')
  }
}
