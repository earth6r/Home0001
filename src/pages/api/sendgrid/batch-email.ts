import { NextApiRequest, NextApiResponse } from 'next/types'
import sendgrid from '@sendgrid/mail'
import admin from 'firebase-admin' // Firebase Admin SDK
import { initializeAdmin } from '@lib/firebase/admin'
import sendgridClient from '@sendgrid/client'

const apiKey = process.env.SENDGRID_API_KEY
console.log('SENDGRID_API_KEY:', apiKey)
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
  const htmlContent = templateContent.email_config.html_content
  const textContent = templateContent.email_config.plain_content

  const sendEmails = async (emailList: string[]) => {
    const messages = emailList.map(email => ({
      to: email,
      from,
      subject,
      text: textContent,
      html: htmlContent,
      reply_to,
    }))

    await sendgrid.send(messages)
  }

  try {
    await sendEmails(emails)

    // Log the emails sent
    const batchEmails = db.collection('emailsSentHistory')

    for (const email of emails) {
      await batchEmails.add({
        email,
        timestamp: Math.floor(new Date().getTime() / 1000),
        from: {
          email: from,
          name: 'Home0001',
        },
        subject,
        text: textContent,
        html: htmlContent,
        reply_to,
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Couldn't send emails", error })
  }

  return res.status(200).json({ message: 'Emails sent' })
}
