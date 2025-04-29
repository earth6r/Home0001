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
// curl -X GET https://hometrics0001.vercel.app/api/users/get-user?walletAddress=0x123456789abcdef
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query = null } = req

  const walletAddress = query?.walletAddress // Extract the 'address' query parameter
  //   const email = query?.email // Extract the 'email' query parameter

  console.log('get-user-profile query:', query) // Log the query parameters for debugging
  console.log('get-user-profile walletAddress:', walletAddress) // Log the wallet address for debugging

  // Check if email is provided
  if (!walletAddress) {
    res.status(400).json({
      error: 'Missing walletAddress in request query', // Respond with error if email is missing
    })
    return
  }

  // Check if email is a string
  if (typeof walletAddress !== 'string') {
    res.status(400).json({
      error: 'walletAddress must be a string', // Respond with error if email is not a string
    })
    return
  }

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  // Query the 'users' collection for a document with the specified walletAddress
  const user = await db
    .collection('users')
    .where('walletAddress', '==', walletAddress)
    .get()

  if (user.empty) {
    res.status(200).json({
      user: null, // Respond with null user if none found
    })
    return
  }

  res.status(200).json({
    user, // Respond with the user document if found
  })
}

// Export the handler as the default export
export default enableCors(handler)
