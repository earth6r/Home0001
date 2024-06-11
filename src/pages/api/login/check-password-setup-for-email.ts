import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin'
import { type NextApiRequest, type NextApiResponse } from 'next'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route in seconds
}

// API route handler for checking email existence
// curl -X POST http://localhost:3000/api/login/check-password-setup-for-email -H "Content-Type: application/json" -d '{"email":"apinanapinan@icloud.com"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Initialize Firebase Admin SDK
  initializeAdmin()

  // Extract email from the request body
  const { email } = req.body

  // Check if email is provided
  if (!email) {
    res.status(400).json({
      message: 'Email is required.',
      code: 'email_required',
    })
    return // Return early if email is not provided
  }

  try {
    // Check if a user with the provided email exists
    const user = await admin.auth().getUserByEmail(email)

    // Respond with the found user and success code
    res.status(200).json({ user, user_exists: true, code: 'success' })
  } catch (error: unknown) {
    // Handle user not found error
    if ((error as any)?.code === 'auth/user-not-found') {
      res.status(200).json({
        user: null,
        user_exists: false,
        code: 'user_not_found',
      })
      return // Return early if user not found error occurs
    }

    // Handle too many requests error
    if ((error as any)?.code === 'auth/too-many-requests') {
      res.status(429).json({
        user: null,
        message: 'Too many requests.',
        request_password: false,
        code: 'too_many_requests',
      })
      return // Return early if too many requests error occurs
    }

    // Log the error to the console for debugging
    // eslint-disable-next-line no-console
    console.error('Error checking email existence:', error)

    // Respond with an internal server error
    res.status(500).json({
      user: null,
      message: 'Internal server error.',
      request_password: false,
      code: 'internal_server_error',
    })
  }
}

// Export the handler as the default export
export default handler
