// Import necessary modules
import { initializeAdmin } from '@lib/firebase/admin' // Function to initialize Firebase Admin SDK
import { enableCors } from '@lib/next/cors'
import admin from 'firebase-admin' // Firebase Admin SDK
import { type NextApiRequest, type NextApiResponse } from 'next' // Type definitions for Next.js API routes
import { Stripe } from 'stripe' // Stripe SDK

// Set configuration options for the API route
export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
  api: {
    bodyParser: false, // Disable Next.js body parsing to use raw body
  },
}

// Initialize Stripe with the API key from environment variables
const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: '2024-04-10', // Set the Stripe API version
})

// Handler function to process API requests
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sig = req.headers['stripe-signature'] || '' // Get the Stripe signature from the headers

  let event

  // Read the raw body from the request
  const chunks: Uint8Array[] = []
  req.on('data', chunk => {
    chunks.push(chunk) // Collect chunks of data
  })

  req.on('end', async () => {
    const rawBody = Buffer.concat(chunks).toString('utf8') // Concatenate chunks and convert to string

    try {
      // Verify and construct the Stripe event using the raw body and signature
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.WEBHOOK_SECRET as string
      )
    } catch (err) {
      // Log and respond with an error if signature verification fails
      console.error(`⚠️  Webhook signature verification failed.`, err)
      res.status(400).send(`Webhook Error: ${err}`)
      return
    }

    // Handle the event based on its type
    switch (event.type) {
      case 'payment_intent.succeeded': // Handle successful payment intent
        const paymentIntent = event.data.object // Get the payment intent object
        const email = paymentIntent.receipt_email // Extract the receipt email from the payment intent

        initializeAdmin() // Initialize Firebase Admin SDK
        const db = admin.firestore() // Get a reference to the Firestore database

        // Query the 'users' collection for a document with the specified email
        const user = await db
          .collection('users')
          .where('email', '==', email)
          .get()
        if (user.empty) {
          // If a user paid without having a user account, add to 'paidUsersWithoutUserLink' collection
          await db.collection('paidUsersWithoutUserLink').add({
            email,
            paymentIntent: JSON.stringify(paymentIntent),
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            propertyType: paymentIntent.metadata?.propertyType || 'unknown', // Use metadata if available, else 'unknown'
          })
          return
        }

        // Add the buying progress for the user in 'usersBuyingProgress' collection
        await db.collection('usersBuyingProgress').add({
          userUID: user.docs[0].id,
          paymentIntent: JSON.stringify(paymentIntent),
          buyingProgress: 2, // Set buying progress to 'download-documents'
          propertyType: paymentIntent.metadata?.propertyType || 'unknown', // Use metadata if available, else 'unknown'
        })

        break
      default:
        // Respond with an error for unexpected event types
        res.status(400).end()
        return
    }

    res.json({ received: true }) // Respond with a success message
  })
}

// Export the handler as the default export
export default enableCors(handler)
