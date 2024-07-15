import { initializeAdmin } from '@lib/firebase/admin'
import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes
import admin from 'firebase-admin' // Firebase Admin SDK

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// curl -X POST http://localhost:3000/api/book-phone-call -H "Content-Type: application/json" -d '{"email":"apinanapinan@icloud.com","timestamp":"1720441800000","phoneNumber":"1234567890"}'
// TODO: might need to add phone number field
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { body = null } = req

  if (!body) {
    res.status(400).json({
      error: 'Missing body in request', // Respond with error if body is missing
    })
    return
  }

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  const { email = null } = body

  if (!email) {
    res.status(400).json({
      error: 'Missing email in request query', // Respond with error if email is missing
    })
    return
  }

  if (typeof email !== 'string') {
    res.status(400).json({
      error: 'email must be a string', // Respond with error if email is not a string
    })
    return
  }

  const user = await db.collection('users').where('email', '==', email).get()

  if (user.empty) {
    res.status(400).json({
      error: 'User not found', // Respond with error if user is not found
    })
    return
  }

  await db.collection('usersBookPhoneCall1').add({
    ...body,
    userUID: user.docs[0].id,
  })

  res.status(200).json({
    status: 'success',
  })
}
