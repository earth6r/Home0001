import { saveError } from '@lib/util/save-error'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// stripe
export const setPaymentIntent = async (email: string, amount: number) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/create-stripe-payment`,
      { propertyType: null, email: email, amount: amount },
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'setPaymentIntent')
  }
}

export const getUserProfile = async (address: string) => {
  try {
    return await axios.get(
      `${BASE_URL}/api/web3/get-user-profile?walletAddress=${address}`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getUserProfile')
  }
}
