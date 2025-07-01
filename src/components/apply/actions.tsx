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
    twitter?: string
    instagram?: string
    website?: string
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
        twitter: profileData.twitter,
        instagram: profileData.instagram,
        website: profileData.website,
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

// BitPay crypto payment actions
export const createBitPayInvoice = async (invoiceData: any) => {
  try {
    return await axios.post(
      `${BASE_URL}/api/web3/create-invoice`,
      invoiceData,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'createBitPayInvoice')
    throw error
  }
}

export const checkBitPayInvoiceStatus = async (invoiceId: string) => {
  try {
    return await axios.get(
      `${BASE_URL}/api/web3/invoice-status?invoiceId=${invoiceId}`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'checkBitPayInvoiceStatus')
    throw error
  }
}

export const getUserCurrentStep = async (email: string) => {
  try {
    return await axios.get(
      `${BASE_URL}/api/web3/get-user-current-step?email=${email}`,
      CONFIG
    )
  } catch (error) {
    console.error(error)
    saveError(error, 'getUserCurrentStep')
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
    | 'UNDER_3_MONTHS'
    | 'NEXT_6_MONTHS'
    | 'WITHIN_NEXT_YEAR'
    | 'DEPENDS' = 'DEPENDS'
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

export const updateUserEssentials = async (
  email: string,
  essentials: string[] | [] = []
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/update-user-essentials`,
      {
        email: email,
        essentials: essentials,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'User essentials updated successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'updateUserEssentiaals')
    return {
      success: false,
      message: `Failed to update user essentials, ${(error as any).message}`,
    }
  }
}

export const initUserPayment = async (
  email: string,
  joiningFee: number,
  paymentMethod: 'Stripe' | 'Bitpay',
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
        paymentAmount: joiningFee,
        paymentMethod: paymentMethod,
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
      message: `Failed to init payment, ${
        (error as any).response.data.error.error.includes(
          'did not return user_id'
        )
          ? 'email already in use'
          : (error as any)?.message
      }`,
    }
  }
}

export const getDynamicPrice = async () => {
  try {
    return await axios.get(`${BASE_URL}/api/web3/get-dynamic-price`, CONFIG)
  } catch (error) {
    console.error(error)
    saveError(error, 'getDynamicPrice')
    return {
      success: false,
      message: `Failed to get dynamic price, ${(error as any).message}`,
    }
  }
}

export const postSendEmail = async (
  email: string,
  profileData: {
    comms: 'whatsapp' | 'telegram'
    first_name: string
  }
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/send-email`,
      {
        email: email,
        type: profileData.comms,
        firstName: profileData.first_name,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'POST send email hit successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'postSendEmail')
    return {
      success: false,
      message: `Failed to POST send email, ${(error as any).message}`,
    }
  }
}

export const postSendMessage = async (
  phone: string,
  profileData: {
    comms: 'whatsapp' | 'telegram'
    first_name: string
  }
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/send-message`,
      {
        phoneNumber: phone,
        firstName: profileData.first_name,
        preferredContactMethod: profileData.comms,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'POST send email hit successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'postSendEmail')
    return {
      success: false,
      message: `Failed to POST send email, ${(error as any).message}`,
    }
  }
}

export const postSendSms = async (
  phone: string,
  profileData: {
    comms: 'whatsapp' | 'telegram'
    first_name: string
  }
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/web3/send-message`,
      {
        phoneNumber: phone,
        preferredContactMethod: profileData.comms,
        firstName: profileData.first_name,
      },
      CONFIG
    )
    return {
      success: true,
      message: 'POST send email hit successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'postSendEmail')
    return {
      success: false,
      message: `Failed to POST send email, ${(error as any).message}`,
    }
  }
}

// Composite action that handles payment initialization and follow-up email
export const initUserPaymentWithEmail = async (
  email: string,
  joiningFee: number,
  paymentMethod: 'Stripe' | 'Bitpay',
  profileData: {
    signup_source: 'referred' | 'purchased'
    referred_token?: string
    comms: 'whatsapp' | 'telegram'
    first_name: string
  }
) => {
  try {
    // Step 1: Initialize payment
    const paymentResult = await initUserPayment(
      email,
      joiningFee,
      paymentMethod,
      {
        signup_source: profileData.signup_source,
        referred_token: profileData.referred_token,
      }
    )

    if (!paymentResult.success) {
      return paymentResult
    }

    // Step 2: Send follow-up email
    const emailResult = await postSendEmail(email, {
      comms: profileData.comms,
      first_name: profileData.first_name,
    })

    if (!emailResult.success) {
      console.warn('Payment succeeded but email failed:', emailResult.message)
      // Still return success since payment went through
      return {
        success: true,
        message: 'Payment succeeded but email notification failed',
        warnings: [emailResult.message],
      }
    }

    return {
      success: true,
      message: 'Payment initialized and email sent successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'initUserPaymentWithEmail')
    return {
      success: false,
      message: `Failed to complete payment flow, ${(error as any).message}`,
    }
  }
}

// Composite action that handles payment initialization and follow-up email
export const updateUserEssentialsWithMessage = async (
  email: string,
  essentials: string[] | [] = [],
  phone: string,
  profileData: {
    comms: 'whatsapp' | 'telegram'
    first_name: string
  }
) => {
  try {
    const userUpdateResult = await updateUserEssentials(email, essentials)

    if (!userUpdateResult.success) {
      return userUpdateResult
    }

    const messageResult = await postSendMessage(phone, {
      comms: profileData.comms,
      first_name: profileData.first_name,
    })

    if (!messageResult.success) {
      console.warn(
        'User update succeeded but message failed:',
        messageResult.message
      )
      return {
        success: true,
        message: 'User update succeeded but message failed',
        warnings: [messageResult.message],
      }
    }

    return {
      success: true,
      message: 'User updated and message sent successfully',
    }
  } catch (error) {
    console.error(error)
    saveError(error, 'updateUserEssentialsWithMessage')
    return {
      success: false,
      message: `Failed to complete user update flow, ${(error as any).message}`,
    }
  }
}
