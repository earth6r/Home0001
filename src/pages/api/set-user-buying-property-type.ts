// Import necessary modules
import { initializeAdmin } from '@lib/firebase/admin' // Function to initialize Firebase Admin SDK
import admin from 'firebase-admin' // Firebase Admin SDK

import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// Example cURL command to test the API endpoint
// curl -X POST http://localhost:3000/api/set-user-buying-property-type -H "Content-Type: application/json" -d '{"userBuyingPropertyType": "les-2A", "email": "apinanapinan@icloud.com"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let body = req.body // Extract the body from the request

  const userBuyingPropertyType = body?.userBuyingPropertyType // Extract the userBuyingPropertyType field from the body
  const email = body?.email // Extract the email field from the body

  // Validate buyingProgress
  if (!userBuyingPropertyType) {
    res.status(400).json({
      error: 'Missing userBuyingPropertyType in request body', // Respond with error if userBuyingPropertyType is missing
    })
    return
  }

  // Validate email
  if (!email) {
    res.status(400).json({
      error: 'Missing email in request body', // Respond with error if email is missing
    })
    return
  }

  //   TODO: cleanup to utils file
  const validUserBuyingPropertyTypes = [
    'les-2A',
    'les-2B',
    'les-2C',
    'les-2D',
    'les-3A',
    'les-3B',
    'les-3C',
    'les-3D',
    'les-4A',
    'les-4B',
    'les-4C',
    'les-4D',
    'les-5B',
    'les-6A',
    'les-6B',
    'townhouse-6',
    'townhouse-7',
  ]

  // Check if userBuyingPropertyType is a string
  if (typeof userBuyingPropertyType !== 'string') {
    res.status(400).json({
      error: 'userBuyingPropertyType must be a string', // Respond with error if userBuyingPropertyType is not a string
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

  // Validate buyingProgress value
  if (!validUserBuyingPropertyTypes.includes(userBuyingPropertyType)) {
    res.status(400).json({
      error: `userBuyingPropertyType must be one of ${validUserBuyingPropertyTypes.join(
        ', '
      )}`, // Respond with error if userBuyingPropertyType is invalid
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
  await db.collection('users').doc(userUID).update({
    userBuyingPropertyType: userBuyingPropertyType,
  })

  // Respond with success message
  res.status(200).json({
    message: 'User buying property type updated successfully',
  })
}

// Export the handler as the default export
export default handler
