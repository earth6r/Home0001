import { NextApiRequest, NextApiResponse } from 'next/types'
import sendgrid from '@sendgrid/mail'
import admin from 'firebase-admin' // Firebase Admin SDK
import { initializeAdmin } from '@lib/firebase/admin'
import sendgridClient from '@sendgrid/client'
import fs from 'fs'

const apiKey = process.env.SENDGRID_API_KEY

if (!apiKey) {
  throw new Error('SENDGRID_API_KEY is not defined')
}

sendgrid.setApiKey(apiKey)

export const config = {
  maxDuration: 300,
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

// TODO: add a stat in booking-details.tsx in analytics.home0001.com to display all the emails sent to that user with a potential dialog to see how the email looks like
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  initializeAdmin()
  const db = admin.firestore()

  for (const event of body) {
    const {
      email,
      event: eventType,
      sg_event_id,
      sg_message_id,
      useragent,
      ip,
      timestamp,
    } = event

    // filter by sg_event_id
    const emailEventHistory = await db
      .collection('emailEventHistory')
      .where('sgMessageId', '==', sg_message_id)
      .get()

    if (eventType === 'delivered') {
      if (!emailEventHistory.empty) {
        await db
          .collection('emailEventHistory')
          .doc(emailEventHistory.docs[0].id)
          .update({
            delivered: true,
            updatedAt: timestamp,
          })
      } else {
        await db.collection('emailEventHistory').add({
          email,
          sgEventId: sg_event_id,
          sgMessageId: sg_message_id,
          useragent: useragent || null,
          ip: ip || null,
          delivered: true,
          createdAt: timestamp,
          updatedAt: timestamp,
          opens: 0,
          clicks: 0,
          clickedUrls: [],
        })

        // TODO: get the email template id and that info and save to db
      }
    }

    if (eventType === 'open') {
      if (!emailEventHistory.empty) {
        await db
          .collection('emailEventHistory')
          .doc(emailEventHistory.docs[0].id)
          .update({
            opened: true,
            openedAt: timestamp,
            updatedAt: timestamp,
          })
      } else {
        throw new Error('open event without existing delivered event')
      }
    }

    if (eventType === 'click') {
      if (!emailEventHistory.empty) {
        await db
          .collection('emailEventHistory')
          .doc(emailEventHistory.docs[0].id)
          .update({
            clicks: admin.firestore.FieldValue.increment(1),
            updatedAt: timestamp,
            clickedUrls: admin.firestore.FieldValue.arrayUnion({
              url: event.url,
              timestamp,
            }),
          })
      } else {
        throw new Error('click event without existing delivered event')
      }
    }
  }

  res.status(200).json({ message: 'ok' })
}
