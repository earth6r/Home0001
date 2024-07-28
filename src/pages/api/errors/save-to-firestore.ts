import { initializeAdmin } from '@lib/firebase/admin'
import { enableCors } from '@lib/next/cors'
import admin from 'firebase-admin'
import { type NextApiRequest, type NextApiResponse } from 'next'

import sgMail from '@sendgrid/mail'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route in seconds
}

type BodyItems = {
  error: string
  errorType: string
  statusCode: number | null
  resolved: boolean
}

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string
sgMail.setApiKey(SENDGRID_API_KEY)

// API route handler for checking email existence
// curl -X POST http://localhost:3000/api/errors/save-to-firestore -H "Content-Type: application/json" -d '{"email":"apinanapinan@icloud.com"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Initialize Firebase Admin SDK
  initializeAdmin()

  // Extract email from the request body
  const {
    error,
    errorType,
    statusCode = null,
    resolved = false,
  }: BodyItems = req.body

  const db = admin.firestore()

  const errorRef = await db.collection('errors').add({
    error,
    errorType,
    statusCode,
    resolved,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  const errorDoc = await errorRef.get()
  const uid = errorDoc.id

  // send email notification
  // TODO: add link to error in analytics.home0001.com
  // TODO: add link to error in firestore
  // TODO: add uid of error in firestore
  // TODO: make the email more readable and user friendly and better ui and fancy

  // sendgrid email
  const msg = {
    to: [
      'yogaratnamapinan@gmail.com',
      'yan@home0001.com',
      'jameslamarre@gmail.com',
    ],
    from: 'talin@home0001.com',
    subject: 'Error Occurred',
    text: JSON.stringify({ error, errorType, statusCode, resolved, reference: `https://analytics.home0001.com/error-details?uid=${uid}` }),
    html: `<strong>
      <h1>Error Occurred</h1>
      <p>Error: ${error.slice(0, 100)}</p>
      <p>Error Type: ${errorType}</p>
      <p>Status Code: ${statusCode}</p>
      <p>Resolved: ${resolved}</p>
      <p>Error Reference: https://analytics.home0001.com/error-details?uid=${uid}</p>
      </strong>`,
  }

  try {
    await sgMail.send(msg)
  } catch (error: unknown) {
    console.error(`Error sending email: ${(error as Error).message}`)
  }

  res.status(200).json({ errorRef })
}

// Export the handler as the default export
export default enableCors(handler)
