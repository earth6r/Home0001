import { NextApiRequest, NextApiResponse } from 'next/types'
import admin from 'firebase-admin' // Firebase Admin SDK
import { initializeAdmin } from '@lib/firebase/admin'

const html = (email: string) => `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      h1 {
        color: #333333;
      }
      p {
        color: #666666;
      }
      .email {
        font-weight: bold;
        color: #333333;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Email Unsubscribed Successfully</h1>
      <p>The email address <span class="email">${email}</span> has been unsubscribed from our mailing list.</p>
    </div>
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
    return res.status(200).send(html(email as string))
  }

  // Unsubscribe email
  await db.collection('unsubscribedSendgridEmails').add({
    email,
    unsubscribedAt: Math.floor(new Date().getTime() / 1000),
  })

  res.setHeader('Content-Type', 'text/html')
  return res.status(200).send(html(email as string))
}
