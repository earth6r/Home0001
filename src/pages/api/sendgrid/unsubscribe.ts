import { NextApiRequest, NextApiResponse } from 'next/types'
import admin from 'firebase-admin' // Firebase Admin SDK
import { initializeAdmin } from '@lib/firebase/admin'

const html = `
<html>
  <body>
    <h1>Email unsubscribed successfully</h1>
  </body>
</html>
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email } = req.query

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  // Check if email is already unsubscribed
  const unsubscribed = await db
    .collection('unsubscribedSendgridEmails')
    .where('email', '==', email)
    .get()

  if (!unsubscribed.empty) {
    res.setHeader('Content-Type', 'text/html')
    return res.status(200).send(html)
  }

  // Unsubscribe email
  await db.collection('unsubscribedSendgridEmails').add({
    email,
    unsubscribedAt: Math.floor(new Date().getTime() / 1000),
  })

  res.setHeader('Content-Type', 'text/html')
  return res.status(200).send(html)
}
