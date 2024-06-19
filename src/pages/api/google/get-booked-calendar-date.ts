// Import necessary modules
import { initializeAdmin } from '@lib/firebase/admin' // Function to initialize Firebase Admin SDK
import { enableCors } from '@lib/next/cors'
import admin from 'firebase-admin' // Firebase Admin SDK

import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// Example cURL command to test the API endpoint
// curl -X POST http://localhost:3000/api/update-buying-progress -H "Content-Type: application/json" -d '{"buyingProgress": "escrow-deposit", "email": "apinanapinan@icloud.com"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { query = null } = req

  const email = query?.email // Extract the email field from the body

  // Validate buyingProgress
  if (!email) {
    res.status(400).json({
      error: 'Missing email in query parameter', // Respond with error if buyingProgress is missing
    })
    return
  }

  // Check if email is a string
  if (typeof email !== 'string') {
    res.status(400).json({
      error: 'email must be a string', // Respond with error if email is not a string
    })
    return
  }

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  // Query the 'user' collection for a document with the specified email
  const user = await db.collection('users').where('email', '==', email).get()

  if (user.empty) {
    res.status(400).json({
      error: 'user with email does not exist', // Respond with error if user is not found
    })
    return
  }

  const userUID = user.docs[0].id // Get the user UID from the query result

  // Query the 'usersBuyingProgress' collection for the user's buying progress
  const usersBuyingProgress = await db
    .collection('usersBuyingProgress')
    .where('userUID', '==', userUID)
    .get()

  if (usersBuyingProgress.empty) {
    res.status(400).json({
      error: 'user with email does not exist in usersBuyingProgress collection', // Respond with error if no buying progress is found
    })
    return
  }

  // Respond with success message
  res.status(200).json({
    date: usersBuyingProgress.docs[0].data().scheduledCalendarDate, // Respond with the scheduled calendar date
  })
}

// Export the handler as the default export
export default enableCors(handler)
