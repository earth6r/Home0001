import axios from 'axios'

export const saveError = (
  error: any,
  errorType: string,
  statusCode: number | null = null
) => {
  // TODO: save userAgent and user IP address
  return axios.post('/api/errors/save-to-firestore', {
    error: JSON.stringify(error),
    errorType,
    statusCode,
  })
}
