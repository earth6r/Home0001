import { NextApiRequest, NextApiResponse } from 'next/types'
import sendgrid from '@sendgrid/mail'
import admin from 'firebase-admin' // Firebase Admin SDK
import { initializeAdmin } from '@lib/firebase/admin'
import sendgridClient from '@sendgrid/client'

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
  let { emails, templateId } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  emails = Array.from(new Set(emails)) // Remove duplicates

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  const from = 'collective@home0001.com'
  const reply_to = 'talin@home0001.com'

  let templateContent

  try {
    const [response, body] = await sendgridClient.request({
      method: 'GET',
      url: `/v3/marketing/singlesends/${templateId}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    templateContent = body

    if (templateContent.error) {
      return res.status(500).json({
        message: "Couldn't retrieve template content 1/2",
        error: templateContent.error,
      })
    }
  } catch (error) {
    console.error('Error fetching template content:', error)
    return res
      .status(500)
      .json({ message: "Couldn't retrieve template content 2/2", error })
  }

  const subject = templateContent.email_config.subject
  let htmlContent = templateContent.email_config.html_content
  let textContent = templateContent.email_config.plain_content

  // Function to send email and save to Firestore one by one
  const sendEmailAndLog = async (email: string) => {
    try {
      // Check if the email is already in the database
      const emailExists = await db
        .collection('emailsSentHistory')
        .where('email', '==', email)
        .where('singleSendId', '==', templateId)
        .get()

      if (!emailExists.empty) {
        console.log(`Email already sent to: ${email}`)
        return
      }

      // check if the email is unsubscribed
      const unsubscribed = await db
        .collection('unsubscribedSendgridEmails')
        .where('email', '==', email)
        .get()

      if (!unsubscribed.empty) {
        console.log(`Email is unsubscribed: ${email}`)
        return
      }

      if (htmlContent.includes('[[email]]')) {
        htmlContent = htmlContent.replace('[[email]]', `${email}`)
      }

      if (textContent.includes('[[email]]')) {
        textContent = textContent.replace('[[email]]', `${email}`)
      }

      // Step 1: Send the email
      const response = await sendgrid.send({
        to: email,
        from: {
          email: from,
          name: 'HOME0001',
        },
        subject,
        text: textContent,
        html: htmlContent,
        replyTo: reply_to,
      })

      const sg_message_id = response[0].headers['x-message-id']

      // Step 2: Log the email to Firestore
      await db.collection('emailsSentHistory').add({
        email,
        createdAt: Math.floor(new Date().getTime() / 1000),
        from,
        subject,
        text: textContent,
        html: htmlContent,
        replyTo: reply_to,
        sgMessageId: sg_message_id,
        delivered: false,
        opened: [],
        clickedUrls: [],
        singleSendId: templateId,
      })

      console.log(`Email sent and logged for: ${email}`)
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error)
      throw new Error(`Failed to send email to ${email}`)
    }
  }

  try {
    // Send and log emails one by one
    for (const email of emails) {
      await sendEmailAndLog(email)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Couldn't send emails", error })
  }

  return res.status(200).json({ message: 'Emails sent successfully' })
}
