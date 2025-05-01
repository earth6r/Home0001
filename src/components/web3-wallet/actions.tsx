import { saveError } from '@lib/util/save-error'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    // 'Accept': 'application/json',
  },
}

// stripe
export const setPaymentIntent = async (
  email: string,
  amount: number,
  product_id: string
) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/create-stripe-payment`,
      { email: email, amount: amount, product_id: product_id },
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'setPaymentIntent')
  }
}

export const createUserProfile = async (
  address: string,
  profileData: {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    comms: 'WhatsApp' | 'Telegram'
    signup_source: 'purchased' | 'referred'
    wallet_address: string
    referred_token?: string
  }
) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/web3/create-user-profile`,
      {
        walletAddress: address,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        email: profileData.email,
        phoneNumber: profileData.phone_number,
        preferredContactMethod: profileData.comms,
        signupSource: profileData.signup_source,
        referredToken: profileData.referred_token || null,
      },
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'createUserProfile')
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
