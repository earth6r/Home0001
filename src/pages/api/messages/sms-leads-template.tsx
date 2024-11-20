import type { NextApiRequest, NextApiResponse } from 'next/types'
import { sendTwilioMessage } from './send-twilio-message'
import { initializeAdmin } from '@lib/firebase/admin'
import admin from 'firebase-admin'

export const config = {
  maxDuration: 300, // Maximum duration for the API route to respond to a request (5 minutes)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
    return
  }
  const { emails, saveInRocketchat = true, automatedToUser = false } = req.body

  if (!Array.isArray(emails) || emails.length === 0) {
    res
      .status(400)
      .json({ message: 'Emails are required and must be an array' })
    return
  }

  initializeAdmin() // Initialize Firebase Admin SDK

  const db = admin.firestore() // Get a reference to the Firestore database

  const leads = await db.collection('leads').get()

  for (const lead of leads.docs) {
    const leadData = lead.data()?.leadData

    if (!leadData) {
      continue
    }

    let lookingToBuyArea
    let numberOfBedrooms
    let fullName
    let email
    let recipientPhone
    let contactPreference

    for (const leadDataField of leadData) {
      if (leadDataField.name === 'where_are_you_looking_to_buy?') {
        // lower_east_side, bed-stuy, williamsburg, greenpoint, somewhere_else
        lookingToBuyArea = leadDataField.values[0]

        if (lookingToBuyArea === 'lower_east_side') {
          lookingToBuyArea = 'Lower East Side'
        } else if (lookingToBuyArea === 'bed-stuy') {
          lookingToBuyArea = 'BedStuy'
        } else if (lookingToBuyArea === 'williamsburg') {
          lookingToBuyArea = 'Williamsburg'
        } else if (lookingToBuyArea === 'greenpoint') {
          lookingToBuyArea = 'Greenpoint'
        } else if (lookingToBuyArea === 'somewhere_else') {
          lookingToBuyArea = 'Somewhere Else'
        }
      } else if (
        leadDataField.name === 'how_many_bedrooms_are_you_looking_for?'
      ) {
        // studio_: Studio
        // at_least_1_bedroom: 1bdrm
        // at_least_2_bedrooms: 2bdrm
        // `3_bedrooms_+`: 3+bdrm
        numberOfBedrooms = leadDataField.values[0]

        if (numberOfBedrooms === 'studio_') {
          numberOfBedrooms = 'Studio'
        } else if (numberOfBedrooms === 'at_least_1_bedroom') {
          numberOfBedrooms = '1bdrm'
        } else if (numberOfBedrooms === 'at_least_2_bedrooms') {
          numberOfBedrooms = '2bdrm'
        } else if (numberOfBedrooms === '3_bedrooms_+') {
          numberOfBedrooms = '3+bdrm'
        }
      } else if (leadDataField.name === 'full_name') {
        fullName = leadDataField.values[0]
      } else if (leadDataField.name === 'email') {
        email = leadDataField.values[0]
      } else if (leadDataField.name === 'phone_number') {
        recipientPhone = leadDataField.values[0]
      } else if (
        leadDataField.name === 'how_would_you_like_us_to_contact_you?_'
      ) {
        // e-mail, send_me_a_text, send_me_an_email, direct_message, give_me_a_call
        contactPreference = leadDataField.values[0]

        if (contactPreference === 'e-mail') {
          contactPreference = 'email'
        } else if (contactPreference === 'send_me_a_text') {
          contactPreference = 'sms'
        } else if (contactPreference === 'send_me_an_email') {
          contactPreference = 'email'
        } else if (contactPreference === 'direct_message') {
          contactPreference = 'direct_message'
        } else if (contactPreference === 'give_me_a_call') {
          contactPreference = 'phone'
        }
      }
    }

    if (!recipientPhone) {
      continue
    }

    if (!emails.includes(email)) {
      continue
    }

    const message = `Hi, This is Talin from HOME0001. You were interested in a ${numberOfBedrooms} in ${lookingToBuyArea}. We’re about to launch a selection of new homes in that neighborhood, so I’d like to put you on a call with a member of the 0001 collective to talk through our most relevant upcoming releases and the application process. How's next week looking for you?`

    const checkExistingTemplateSent = await db
      .collection('textMessagesHistory')
      .where('recipientPhone', '==', recipientPhone)
      .where('template', '==', 'sms-leads-template')
      .get()

    if (!checkExistingTemplateSent.empty) {
      continue
    }

    console.log('email', email)
    await sendTwilioMessage(
      recipientPhone,
      message,
      saveInRocketchat,
      automatedToUser,
      {
        template: 'sms-leads-template',
      }
    )
  }

  res.status(200).json({ message: 'success' })
}
