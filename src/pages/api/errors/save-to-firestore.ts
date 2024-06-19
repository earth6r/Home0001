import { initializeAdmin } from '@lib/firebase/admin'
import { enableCors } from '@lib/next/cors'
import admin from 'firebase-admin'
import { type NextApiRequest, type NextApiResponse } from 'next'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route in seconds
}

type BodyItems = {
  error: string
  errorType: string
  statusCode: number | null
  resolved: boolean
}

// API route handler for checking email existence
// curl -X POST http://localhost:3000/api/login/check-password-setup-for-email -H "Content-Type: application/json" -d '{"email":"apinanapinan@icloud.com"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Initialize Firebase Admin SDK
  initializeAdmin()

  // Extract email from the request body
  const {
    error,
    errorType,
    statusCode = null,
    resolved = false,
  }: BodyItems = req.body

  const db = admin.firestore()

  const errorRef = await db.collection('errors').add({
    error,
    errorType,
    statusCode,
    resolved,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  res.status(200).json({ errorRef })
}

// Export the handler as the default export
export default enableCors(handler)
