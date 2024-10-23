import { NextApiRequest, NextApiResponse } from 'next/types'
import admin from 'firebase-admin' // Firebase Admin SDK
import { initializeAdmin } from '@lib/firebase/admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    singleSendId = null,
    email = null,
    referer = null,
    submissionType = null,
  } = req.body

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  if (referer && singleSendId && email && submissionType) {
    await db.collection('emailReferers').add({
      email,
      singleSendId,
      referer,
      submissionType,
      createdAt: Math.floor(new Date().getTime() / 1000),
    })
  }

  res.status(200).json({ message: 'Metric tracked' })
}
