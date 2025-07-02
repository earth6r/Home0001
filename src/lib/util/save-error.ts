import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const ENV = process.env.NEXT_PUBLIC_SANITY_DATASET

export const saveError = (
  error: any,
  errorType: string,
  statusCode: number | null = null
) => {
  // NOTE: do not save error if in development
  if (ENV !== 'production') {
    console.error(error)
    return
  }

  // TODO: save userAgent and user IP address
  // return axios.post(`${BASE_URL}/api/errors/save-to-firestore`, {
  //   error: JSON.stringify(error),
  //   errorType,
  //   statusCode,
  // })
}
