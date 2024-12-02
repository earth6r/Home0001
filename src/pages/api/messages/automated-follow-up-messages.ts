import { NextApiRequest, NextApiResponse } from 'next/types'
import { sendTwilioMessage } from './send-twilio-message'
import {
  setupFirebase,
  userRepliedInRocketChat,
} from '../cron/view-template-replies'

function validateRequestBody(
  phoneNumber: unknown,
  messageId: unknown,
  followUpCount: unknown,
  locationPreference: unknown,
  bedroomPreference: unknown
): { error?: string } {
  if (!phoneNumber) {
    return { error: 'Missing phone number' }
  }

  if (typeof phoneNumber !== 'string') {
    return { error: 'Phone number must be a string' }
  }

  if (!phoneNumber.startsWith('+')) {
    return { error: 'Phone number must start with a plus sign' }
  }

  if (!messageId) {
    return { error: 'Missing message' }
  }

  if (typeof messageId !== 'number') {
    return { error: 'Message must be a number' }
  }

  if (followUpCount === undefined || followUpCount === null) {
    return { error: 'Missing follow up count' }
  }

  if (typeof followUpCount !== 'number') {
    return { error: 'Follow up count must be a number' }
  }

  if (followUpCount < 0) {
    return { error: 'Follow up count must be a non-negative number' }
  }

  if (!locationPreference) {
    return { error: 'Missing location preference' }
  }

  if (typeof locationPreference !== 'string') {
    return { error: 'Location preference must be a string' }
  }

  if (
    ![
      'lower_east_side',
      'bed-stuy',
      'williamsburg',
      'greenpoint',
      'somewhere_else',
    ].includes(locationPreference)
  ) {
    return { error: 'Invalid location preference' }
  }

  if (!bedroomPreference) {
    return { error: 'Missing bedroom preference' }
  }

  if (typeof bedroomPreference !== 'string') {
    return { error: 'Bedroom preference must be a string' }
  }

  if (
    ![
      'studio_',
      'at_least_1_bedroom',
      'at_least_2_bedrooms',
      '3_bedrooms_+',
    ].includes(bedroomPreference)
  ) {
    return { error: 'Invalid bedroom preference' }
  }

  return {} // No errors
}

function getMessageById(messageId: string): string {
  switch (messageId) {
    case 1:
      return 'Hello! This is a follow-up message. Please reply with "yes" to continue.'
    case 2:
      return 'Hello! This is the second follow-up message. Please reply with "yes" to continue.'
    case 3:
      return 'Hello! This is the third follow-up message. Please reply with "yes" to continue.'
    default:
      return 'Hello! This is a follow-up message. Please reply with "yes" to continue.'
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.error('req.body', req.body)
  // followUpCount is the number of follow up messages this endpoint is sending for.
  // The first message is the initial message, so we start at 0.
  const {
    recipientPhone,
    messageId,
    followUpCount,
    locationPreference,
    bedroomPreference,
  } = req.body

  const validationResult = validateRequestBody(
    recipientPhone,
    messageId,
    followUpCount,
    locationPreference,
    bedroomPreference
  )

  const message = getMessageById(messageId)

  if (validationResult?.error) {
    res.status(400).json({ error: validationResult.error })
    return
  }

  const db = setupFirebase()

  const replied = await userRepliedInRocketChat(db, recipientPhone)

  if (replied) {
    res.status(200).json({ success: true })
    return
  }

  sendTwilioMessage(recipientPhone, message, false, true, {
    template: 'automated_follow_up_messages',
    followUpCount,
    replied: false,
  })

  res.status(200).json({ success: true })
}
