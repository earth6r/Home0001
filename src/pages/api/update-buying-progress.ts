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
// curl -X POST http://localhost:3000/api/update-buying-progress -H "Content-Type: application/json" -d '{"buyingProgress": "escrowDeposit", "email": "apinanapinan@icloud.com"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { body = null } = req

  const buyingProgress = body?.buyingProgress // Extract the buyingProgress field from the body
  const email = body?.email // Extract the email field from the body

  // Validate buyingProgress
  if (!buyingProgress) {
    res.status(400).json({
      error: 'Missing buyingProgress in request body', // Respond with error if buyingProgress is missing
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

  // Check if buyingProgress is a string
  if (typeof buyingProgress !== 'string') {
    res.status(400).json({
      error: 'buyingProgress must be a string', // Respond with error if buyingProgress is not a string
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
  if (
    ![
      'escrowDeposit',
      'downloadDocuments',
      'scheduleClosing',
      'fullPayment',
      'completed',
    ].includes(buyingProgress)
  ) {
    res.status(400).json({
      error:
        'buyingProgress must be one of escrowDeposit, downloadDocuments, scheduleClosing, fullPayment, completed', // Respond with error if buyingProgress is not a valid value
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

  // Update the user's buying progress
  await db
    .collection('usersBuyingProgress')
    .doc(usersBuyingProgress.docs[0].id)
    .update({
      [buyingProgress]: true, // Update the buying progress using the mapped value
    })

  // query the updated buying progress
  const updatedBuyingProgress = await db
    .collection('usersBuyingProgress')
    .doc(usersBuyingProgress.docs[0].id)
    .get()

  // if .escrowDeposit is true, .scheduleClosing is true, .downloadDocuments is true, .fullPayment is true, then set .completed to true
  if (
    updatedBuyingProgress.data()?.escrowDeposit &&
    updatedBuyingProgress.data()?.scheduleClosing &&
    updatedBuyingProgress.data()?.downloadDocuments &&
    updatedBuyingProgress.data()?.fullPayment
  ) {
    await db
      .collection('usersBuyingProgress')
      .doc(usersBuyingProgress.docs[0].id)
      .update({
        completed: true,
      })
  }

  // Respond with success message
  res.status(200).json({
    message: 'Buying progress updated successfully',
  })
}

// Export the handler as the default export
export default enableCors(handler)
