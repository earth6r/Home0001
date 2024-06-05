import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin'

import { type NextApiRequest, type NextApiResponse } from 'next'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // 5 minutes max duration for the API route to respond to a request
}

// curl -X GET http://localhost:3000/api/get-buying-progress?email=apinanapinan@icloud.com
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query

  const email = query?.email

  if (!email) {
    res.status(400).json({
      error: 'Missing email in request query',
    })
    return
  }

  if (typeof email !== 'string') {
    res.status(400).json({
      error: 'email must be a string',
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

  const user = await db.collection('users').where('email', '==', email).get()
  if (user.empty) {
    res.status(400).json({
      error: 'User not found',
    })
    return
  }

  const buyingProgress = await db
    .collection('usersBuyingProgress')
    .where(admin.firestore.FieldPath.documentId(), '==', user.docs[0].id)
    .get()
  if (buyingProgress.empty) {
    res.status(200).json({
      buyingProgress: null,
    })
    return
  }

  await db.collection('usersBuyingProgress').doc(user.docs[0].id).update({
    // @ts-expect-error
    buyingProgress: mapBuyingProgress[buyingProgress], // allowed items are 1 (escrow-deposit, default), 2 (download-documents), 3 (schedule-closing), 4 (full-payment), 5 (completed)
  })
}

// Export the handler as the default export
export default handler
