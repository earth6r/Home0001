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
  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  // Query the 'users' collection for a document with the specified email
  const prices = await db
    .collection('cryptoPrices')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
  if (prices.empty) {
    res.status(200).json({
      bitcoin: null,
      ethereum: null,
    })
    return
  }
  res.status(200).json({
    bitcoin: prices.docs[0].data().bitcoin,
    ethereum: prices.docs[0].data().ethereum,
  })
}

// Export the handler as the default export
export default enableCors(handler)
