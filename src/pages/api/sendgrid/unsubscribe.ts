import { NextApiRequest, NextApiResponse } from 'next/types'
import admin from 'firebase-admin' // Firebase Admin SDK
import { initializeAdmin } from '@lib/firebase/admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email } = req.query

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  // check if email is already unsubscribed
  const unsubscribed = await db
    .collection('unsubscribedSendgridEmails')
    .where('email', '==', email)
    .get()

  if (!unsubscribed.empty) {
    return res.status(200).json({ message: 'Email already unsubscribed' })
  }

  // unsubscribe email
  await db.collection('unsubscribedSendgridEmails').add({
    email,
    unsubscribedAt: Math.floor(new Date().getTime() / 1000),
  })
}
