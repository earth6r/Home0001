import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin'

import { type NextApiRequest, type NextApiResponse } from 'next'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // 5 minutes max duration for the API route to respond to a request
}

// curl -X POST http://localhost:3000/api/update-buying-progress -H "Content-Type: application/json" -d '{"buyingProgress": "escrow-deposit", "email": "apinanapinan@icloud.com"}'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let body = req.body

  const buyingProgress = body?.buyingProgress
  const email = body?.email

  if (!buyingProgress) {
    res.status(400).json({
      error: 'Missing buyingProgress in request body',
    })
    return
  }

  if (!email) {
    res.status(400).json({
      error: 'Missing email in request body',
    })
    return
  }

  if (typeof buyingProgress !== 'string') {
    res.status(400).json({
      error: 'buyingProgress must be a string',
    })
    return
  }

  if (typeof email !== 'string') {
    res.status(400).json({
      error: 'email must be a string',
    })
    return
  }

  if (
    ![
      'escrow-deposit',
      'download-documents',
      'schedule-closing',
      'full-payment',
      'completed',
    ].includes(buyingProgress)
  ) {
    res.status(400).json({
      error: 'buyingProgress must be 1, 2, 3, 4, or 5',
    })
    return
  }

  const mapBuyingProgress = {
    'escrow-deposit': 1,
    'download-documents': 2,
    'schedule-closing': 3,
    'full-payment': 4,
    completed: 5,
  }

  initializeAdmin()

  const db = admin.firestore()

  const user = await db.collection('user').where('email', '==', email).get()

  if (user.empty) {
    res.status(400).json({
      error: 'user with email does not exist',
    })
    return
  }

  const userUID = user.docs[0].id

  const usersBuyingProgress = await db
    .collection('usersBuyingProgress')
    .where(admin.firestore.FieldPath.documentId(), '==', userUID)
    .get()

  if (usersBuyingProgress.empty) {
    res.status(400).json({
      error: 'user with email does not exist in usersBuyingProgress collection',
    })
    return
  }

  await db.collection('usersBuyingProgress').doc(userUID).update({
    // @ts-expect-error
    buyingProgress: mapBuyingProgress[buyingProgress], // allowed items are 1 (escrow-deposit, default), 2 (download-documents), 3 (schedule-closing), 4 (full-payment), 5 (completed)
  })
}

// Export the handler as the default export
export default handler
