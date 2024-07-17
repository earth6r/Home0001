import { initializeAdmin } from '@lib/firebase/admin'
import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes
import admin from 'firebase-admin' // Firebase Admin SDK

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// curl -X GET http://localhost:3000/api/get-user-book-property-tours?email=apinanapinan@icloud.com
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { query = null } = req

  if (!query) {
    res.status(400).json({
      error: 'Missing query in request', // Respond with error if query is missing
    })
    return
  }

  const { email = null } = query

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

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  // Query the 'users' collection for a document with the specified email
  const user = await db.collection('users').where('email', '==', email).get()
  if (user.empty) {
    res.status(400).json({
      error: 'User not found', // Respond with error if user is not found
    })
    return
  }

  // Query the 'usersBuyingProgress' collection for the user's buying progress
  const usersBookPropertyTours = await db
    .collection('usersBookPropertyTour')
    .where('userUID', '==', user.docs[0].id)
    .get()

  if (usersBookPropertyTours.empty) {
    res.status(200).json({
      usersBookPropertyTours: [],
    })
    return
  }

  const usersBookPropertyToursValue = usersBookPropertyTours.docs.map(doc =>
    doc.data()
  ) // Get the user's buying progress

  res.status(200).json({
    usersBookPropertyTours: usersBookPropertyToursValue,
  })
}
