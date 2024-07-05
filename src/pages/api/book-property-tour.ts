import { initializeAdmin } from '@lib/firebase/admin'
import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes
import admin from 'firebase-admin' // Firebase Admin SDK
import { propertyTypes } from '@lib/util/property-types'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

// curl -X POST http://localhost:3000/api/book-property-tour -H "Content-Type: application/json" -d '{"email":"apinanapinan@icloud.com","timestamp":"1720441800000","property":"unit-6a","phoneNumber":"1234567890"}'
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

  const {
    email = null,
    timestamp = null,
    property = null,
    phoneNumber = null,
  } = body

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

  if (!property) {
    res.status(400).json({
      error: 'Missing property in request query', // Respond with error if property is missing
    })
    return
  }

  if (typeof property !== 'string') {
    res.status(400).json({
      error: 'property must be a string', // Respond with error if property is not a string
    })
    return
  }

  if (!timestamp) {
    res.status(400).json({
      error: 'Missing timestamp in request query', // Respond with error if timestamp is missing
    })
    return
  }

  if (typeof timestamp !== 'string') {
    res.status(400).json({
      error: 'timestamp must be a string', // Respond with error if timestamp is not a string
    })
    return
  }

  // if timestamp converted to number is invalid, respond with error
  if (isNaN(Number(timestamp))) {
    res.status(400).json({
      error: 'Invalid timestamp', // Respond with error if timestamp is invalid
    })
    return
  }

  if (!phoneNumber) {
    res.status(400).json({
      error: 'Missing phoneNumber in request query', // Respond with error if phoneNumber is missing
    })
    return
  }

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  const user = await db.collection('users').where('email', '==', email).get()

  if (user.empty) {
    res.status(400).json({
      error: 'User not found', // Respond with error if user is not found
    })
    return
  }

  if (!propertyTypes.includes(property)) {
    res.status(400).json({
      error: 'Invalid property type', // Respond with error if property is not a valid property type
    })
    return
  }

  // TODO: validate timestamp to make sure it is a future date

  await db.collection('usersBookPropertyTour').add({
    userUID: user.docs[0].id,
    property,
    timestamp,
    phoneNumber,
  })

  res.status(200).json({
    status: 'success',
  })
}
