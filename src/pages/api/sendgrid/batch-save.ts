// THIS FILE IS ONLY FOR SAVING OLD DATA TO FIREBASE
import { NextApiRequest, NextApiResponse } from 'next/types'
import sendgrid from '@sendgrid/mail'
import admin from 'firebase-admin' // Firebase Admin SDK
import { initializeAdmin } from '@lib/firebase/admin'
import sendgridClient from '@sendgrid/client'
import fs from 'fs'
import axios from 'axios'

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
  initializeAdmin()
  const db = admin.firestore()

  //   let url = `https://api.sendgrid.com/v3/messages?limit=10000&query=from_email="collective@home0001.com"`
  //   url = encodeURI(url)
  //   const response = await axios.get(url, {
  //     headers: {
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //   })

  //   {
  //     from_email: 'collective@home0001.com',
  //     msg_id: 'ddRnWgllSD-0igc0Xmtz5A.recvd-canary-7f84b664b6-7pshd-1-67030527-A.0',
  //     subject: 'NEXT RELEASE: 2BR w/ PRIVATE TERRACE in BED-STUY',
  //     to_email: 'araneta.js12@gmail.com',
  //     status: 'delivered',
  //     opens_count: 2,
  //     clicks_count: 0,
  //     last_event_time: '2024-10-10T04:38:49Z'
  //   }

  //   const singleSendDetailsUrl = `https://api.sendgrid.com/v3/marketing/singlesends/279e2e38-8411-11ef-b11a-0e5c7721f592`
  //   const singleSendResponse = await axios.get(singleSendDetailsUrl, {
  //     headers: {
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //   })

  //   console.log('response', singleSendResponse.data)

  const singleSendsUrl = `https://api.sendgrid.com/v3/marketing/singlesends`
  const response = await axios.get(singleSendsUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  const singleSends = response.data.result

  for (const singleSend of singleSends) {
    const singleSendDetailsUrl = `https://api.sendgrid.com/v3/marketing/singlesends/${singleSend.id}`
    const singleSendResponse = await axios.get(singleSendDetailsUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    const singleSendId = singleSendResponse.data.id
    const subject = singleSendResponse.data.email_config.subject
    const htmlContent = singleSendResponse.data.email_config.html_content
    const plainContent = singleSendResponse.data.email_config.plain_content

    const emailMarketingTemplates = await db
      .collection('emailMarketingTemplates')
      .where('singleSendId', '==', singleSendId)
      .get()

    if (emailMarketingTemplates.empty) {
      await db.collection('emailMarketingTemplates').add({
        singleSendId,
        subject,
        htmlContent,
        plainContent,
        createdAt: Math.floor(new Date().getTime() / 1000),
        updatedAt: Math.floor(new Date().getTime() / 1000),
      })
    } else {
      await db
        .collection('emailMarketingTemplates')
        .doc(emailMarketingTemplates.docs[0].id)
        .update({
          singleSendId,
          subject,
          htmlContent,
          plainContent,
          updatedAt: Math.floor(new Date().getTime() / 1000),
        })
    }
  }

  let url = `https://api.sendgrid.com/v3/messages?limit=100000&query=from_email="collective@home0001.com"`
  url = encodeURI(url)
  const messages = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  for (const message of messages.data.messages) {
    const {
      msg_id,
      subject,
      to_email,
      status,
      opens_count,
      clicks_count,
      last_event_time,
    } = message

    console.log('message', message)

    // query template db and filter by subject
    const emailMarketingTemplates = await db
      .collection('emailMarketingTemplates')
      .where('subject', '==', subject)
      .get()

    let templateId = null
    if (emailMarketingTemplates.empty) {
      console.log('Email marketing template not found')
      continue
    } else {
      const emailMarketingTemplate = emailMarketingTemplates.docs[0].data()
      templateId = emailMarketingTemplate.singleSendId
    }

    // 2024-10-11T19:47:24Z convert to epoch
    const timestamp = Math.floor(new Date(last_event_time).getTime() / 1000)

    const emailMessagesHistory = await db
      .collection('emailMessagesHistory')
      .where('msgId', '==', msg_id)
      .get()

    if (emailMessagesHistory.empty) {
      await db.collection('emailMessagesHistory').add({
        msgId: msg_id,
        subject,
        toEmail: to_email,
        status,
        opensCount: opens_count,
        clicksCount: clicks_count,
        lastEventTime: timestamp,
        templateId,
        createdAt: Math.floor(new Date().getTime() / 1000),
        updatedAt: Math.floor(new Date().getTime() / 1000),
      })
    } else {
      await db
        .collection('emailMessagesHistory')
        .doc(emailMessagesHistory.docs[0].id)
        .update({
          status,
          opensCount: opens_count,
          clicksCount: clicks_count,
          lastEventTime: timestamp,
          updatedAt: Math.floor(new Date().getTime() / 1000),
        })
    }
  }

  res.status(200).json(singleSends)
}
