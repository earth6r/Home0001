import { initializeAdmin } from '@lib/firebase/admin'
import type { NextApiRequest, NextApiResponse } from 'next/types'
import admin from 'firebase-admin' // Firebase Admin SDK

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.error('Request body:', req.body)

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  await db.collection('hubspotWebhookLogs').add({
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
    url: req.url,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  })

  res.status(200).json({
    status: 'success',
  })
}
