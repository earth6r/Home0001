// Import necessary modules
import { initializeAdmin } from '@lib/firebase/admin' // Function to initialize Firebase Admin SDK
import { enableCors } from '@lib/next/cors'
import admin from 'firebase-admin' // Firebase Admin SDK

import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// Handler function to process API requests
// curl -X GET http://localhost:3000/api/get-buying-progress?email=apinanapinan@icloud.com
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query // Extract query parameters from the request

  const email = query?.email // Extract the 'email' query parameter

  // Check if email is provided
  if (!email) {
    res.status(400).json({
      error: 'Missing email in request query', // Respond with error if email is missing
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

  // Mapping of buying progress stages to numerical values
  // TODO: cleanup to utils file
  const mapBuyingProgress = {
    'escrow-deposit': 1,
    'download-documents': 2,
    'schedule-closing': 3,
    'full-payment': 4,
    completed: 5,
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
  const buyingProgress = await db
    .collection('usersBuyingProgress')
    .where('userUID', '==', user.docs[0].id)
    .get()
  if (buyingProgress.empty) {
    res.status(200).json({
      buyingProgress: null, // Respond with null if no buying progress is found
    })
    return
  }

  const buyingProgressValue = buyingProgress.docs[0].data().buyingProgress // Get the user's buying progress

  res.status(200).json({
    buyingProgress: buyingProgressValue, // Respond with the user's buying progress
  })
}

// Export the handler as the default export
export default enableCors(handler)
