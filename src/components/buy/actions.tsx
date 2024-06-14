import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
}

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
