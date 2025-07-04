import { saveError } from '@lib/util/save-error'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const getBookedCalendarDates = async (email: string) => {
  try {
    return await axios.get(
      `${BASE_URL}/api/web3/get-events?email=${email}`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getBookedCalendarDates')
  }
}

export const updateUserProfile = async (profileData: {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  comms?: 'WhatsApp' | 'Telegram'
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
        // preferredContactMethod: profileData.comms,
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
