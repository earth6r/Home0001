import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin' // Firebase Admin SDK
import { collection, getDoc } from 'firebase/firestore/lite'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  const { email } = req.query

  if (!email) {
    res.status(400).json({
      status: 'error',
      message: 'Email is required in the query',
    })
    return
  }

  const userRef = await db
    .collection('potentialCustomers')
    .where('email', '==', email)
    .limit(1)
    .get()

  if (userRef.empty) {
    res.status(404).json({
      status: 'error',
      message: 'User not found',
    })
    return
  }

  const user = userRef.docs[0].data()

  res.status(200).json({
    status: 'success',
    data: {
      preferredCommunicationMedium: user?.preferredCommunicationMedium || null,
    },
  })
}
