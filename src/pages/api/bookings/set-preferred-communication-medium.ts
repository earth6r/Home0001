import { initializeAdmin } from '@lib/firebase/admin'
import { updateHubspotContactProperty } from '@lib/util/update-hubspot-contact'
import admin from 'firebase-admin' // Firebase Admin SDK
import { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  const { email, preferredCommunicationMedium } = req.body

  if (!email) {
    res.status(400).json({
      status: 'error',
      message: 'Email is required',
    })
    return
  }

  if (!preferredCommunicationMedium) {
    res.status(400).json({
      status: 'error',
      message: 'Preferred communication medium is required',
    })
    return
  }

  if (!['sms', 'whatsapp', 'telegram'].includes(preferredCommunicationMedium)) {
    res.status(400).json({
      status: 'error',
      message:
        'Preferred communication medium must be either email, whatsapp, or phone',
    })
    return
  }

  const userRef = await db
    .collection('users')
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

  await db.collection('users').doc(userRef.docs[0].id).update({
    preferredCommunicationMedium,
  })

  await updateHubspotContactProperty(
    email,
    'preferred_communication_channel',
    preferredCommunicationMedium
  )

  res.status(200).json({
    status: 'success',
  })
}
