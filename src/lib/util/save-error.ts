import axios from 'axios'

export const saveError = (
  error: any,
  errorType: string,
  statusCode: number | null = null
) => {
  return axios.post('/api/errors/save-to-firestore', {
    error: JSON.stringify(error),
    errorType,
    statusCode,
  })
}
