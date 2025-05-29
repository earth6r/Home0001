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
    wallet_address: string
    public_profiles?: string[]
  }
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/create-user-profile`,
      {
        walletAddress: address,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        email: profileData.email,
        phoneNumber: profileData.phone_number,
        preferredContactMethod: profileData.comms,
        publicProfiles: profileData.public_profiles || [],
      },
      CONFIG
    )
    return {
      success: true,
      message: 'User profile created successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'createUserProfile')
    return {
      success: false,
      message: `Failed to create user profile, ${(error as any).message}`,
    }
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

export const updateUserLocation = async (
  email: string,
  location: string,
  other?: string
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/update-user-location`,
      {
        email: email,
        whereDoYouWantToBuy: location,
        elseValue: other,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'User location updated successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'updateUserLocation')
    return {
      success: false,
      message: `Failed to update user location, ${(error as any).message}`,
    }
  }
}

export const updateUserPriceRange = async (
  email: string,
  minPrice: number | null,
  maxPrice: number | null
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/update-user-price-range`,
      {
        email: email,
        minPrice: minPrice,
        maxPrice: maxPrice,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'User price range updated successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'updateUserPriceRange')
    return {
      success: false,
      message: `Failed to update user price range, ${(error as any).message}`,
    }
  }
}

export const updateUserTimeline = async (
  email: string,
  timeline:
    | 'IMMEDIATELY'
    | 'IN_1_3_MONTHS'
    | 'IN_3_6_MONTHS'
    | 'IN_6_12_MONTHS'
    | 'NOT_SURE_YET'
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/update-user-timeline`,
      {
        email: email,
        whenToBuy: timeline,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'User timeline updated successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'updateUserTimeline')
    return {
      success: false,
      message: `Failed to update user timeline, ${(error as any).message}`,
    }
  }
}

export const updateUserRooms = async (
  email: string,
  minBedrooms: number | null,
  maxBedrooms: number | null,
  depends: boolean = false
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/update-user-rooms`,
      {
        email: email,
        minBedrooms: minBedrooms,
        maxBedrooms: maxBedrooms,
        depends: depends,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'User rooms updated successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'updateUserRooms')
    return {
      success: false,
      message: `Failed to update user rooms, ${(error as any).message}`,
    }
  }
}

export const initUserPayment = async (
  email: string,
  profileData: {
    signup_source: 'referred' | 'purchased'
    referred_token?: string
  }
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/make-payment`,
      {
        email: email,
        signupSource: profileData.signup_source,
        referredToken: profileData.referred_token || null,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'Payment or referral initiated successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'initUserPayment')
    return {
      success: false,
      message: `Failed to init payment, ${(error as any).message}`,
    }
  }
}
