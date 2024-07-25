import { initializeAdmin } from '@lib/firebase/admin'
import { enableCors } from '@lib/next/cors'
import admin from 'firebase-admin'
import { type NextApiRequest, type NextApiResponse } from 'next'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route in seconds
}

// API route handler for setting a password for a user
// curl -X POST http://localhost:3000/api/login/create-user -H "Content-Type: application/json" -d '{"email":"test@test.com"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Initialize Firebase Admin SDK
  initializeAdmin()

  // Get Firestore instance from the initialized admin SDK
  const db = admin.firestore()

  // Extract email and password from the request body
  const { email } = req.body

  // Check if email is provided
  if (!email) {
    res
      .status(400)
      .json({ message: 'Email is required.', code: 'email_required' })
    return // Return early if email is not provided
  }

  try {
    const user = await admin.auth().getUserByEmail(email)

    res.status(400).json({
      user: null,
      message: 'Email already exists.',
      code: 'email_already_set_password',
    })
  } catch (error: unknown) {
    if ((error as any)?.code === 'auth/user-not-found') {
    } else if ((error as any)?.code === 'auth/too-many-requests') {
      res.status(429).json({
        user: null,
        message: 'Too many requests.',
        code: 'too_many_requests',
      })
      return
    } else {
      res.status(500).json({
        user: null,
        message: 'Internal server error.',
        code: 'internal_server_error',
      })
    }
  }

  try {
    // Store user data in Firestore with a timestamp
    const response = await db.collection('users').add({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    // Respond with the created user and a success code
    res.status(200).json({ user: response, code: 'success' })
  } catch (error: unknown) {
    // Handle too many requests error
    if ((error as any)?.code === 'auth/too-many-requests') {
      res.status(429).json({
        user: null,
        message: 'Too many requests.',
        code: 'too_many_requests',
      })
      return // Return early if too many requests error occurs
    }

    // Handle email already exists error
    if ((error as any)?.code === 'auth/email-already-exists') {
      res.status(400).json({
        user: null,
        message: 'Email already exists.',
        code: 'email_already_exists',
      })
      return // Return early if email already exists error occurs
    }

    // Log the error to the console for debugging
    console.error('Error creating user:', error)

    // Respond with an internal server error
    res.status(500).json({
      user: null,
      message: 'Internal server error.',
      code: 'internal_server_error',
    })
  }
}

// Export the handler as the default export
export default enableCors(handler)
