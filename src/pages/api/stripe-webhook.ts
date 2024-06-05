import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin'

import { type NextApiRequest, type NextApiResponse } from 'next'
import { Stripe } from 'stripe'

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // 5 minutes max duration for the API route to respond to a request
  api: {
    bodyParser: false, // Disable Next.js body parsing to use raw body
  },
}

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: '2024-04-10',
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sig = req.headers['stripe-signature'] || ''

  let event

  // Read the raw body from the request
  const chunks: Uint8Array[] = []
  req.on('data', chunk => {
    chunks.push(chunk)
  })

  req.on('end', async () => {
    const rawBody = Buffer.concat(chunks).toString('utf8')

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.WEBHOOK_SECRET as string
      )
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`⚠️  Webhook signature verification failed.`, err)
      res.status(400).send(`Webhook Error: ${err}`)
      return
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        const email = paymentIntent.receipt_email

        initializeAdmin()
        const db = admin.firestore()

        const user = await db
          .collection('users')
          .where('email', '==', email)
          .get()
        if (user.empty) {
          // a user paid without having a user account
          await db.collection('paidUsersWithoutUserLink').add({
            email,
            paymentIntent: JSON.stringify(paymentIntent),
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          })
          return
        }

        await db
          .collection('users')
          .doc(user.docs[0].id)
          .update({
            paymentIntent: JSON.stringify(paymentIntent),
            paidDeposit: true,
            //   TODO: update user to have buying process or whatever yan gave me (add default of step 1 in the get buying process for user endpoint)
          })

        break
      default:
        // Unexpected event type
        res.status(400).end()
        return
    }

    res.json({ received: true })
  })
}

// Export the handler as the default export
export default handler
