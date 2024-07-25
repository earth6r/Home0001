import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const saveError = (
  error: any,
  errorType: string,
  statusCode: number | null = null
) => {
  // TODO: save userAgent and user IP address
  return axios.post(`${BASE_URL}/api/errors/save-to-firestore`, {
    error: JSON.stringify(error),
    errorType,
    statusCode,
  })
}
